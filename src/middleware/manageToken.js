import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';
import * as keys from '../constants/storageKeys';
import decode from 'jwt-decode';

function tryGetUsername(token, cb) {
  try {
    const username = decode(token).username;
    if (!username) {
      return cb(undefined, new Error("Could not find username in token"));
    }
    cb(username);
  } catch (err) {
    return cb(undefined, err);
  }
}

// NOTE: we can pass in a mock storage object here to unit test
export default function manageTokenMiddleware(storage = localStorage) {
  return (store) => {
    return (next) => (action) => {

      // TODO: this feels hacky
      if (action.useToken) {
        const token = store.getState().auth.token;
        if (token) {
          const config = action.config || {};
          const headers = config.headers || {};
          action.config = {
            ...config,
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`
            }
          };
        }
      }

      switch (action.type) {
        case types.LOGIN_REQUIRED: {
          push(action.redirectTo);
          return next(action);
        }
        case types.CHECK_CREDS: {
          const token = store.getState().auth.token || storage.getItem(keys.ACCESS_TOKEN);
          if (token) {
            tryGetUsername(token, (username, error) => {
              if (error) {
                store.dispatch(appActions.showMessage('Login Error:', error.message, 'danger'));
                store.dispatch({ type: types.LOGIN_FAILURE, error });
              } else {
                store.dispatch({ type: types.LOGIN_SUCCESS, token: token, username: username });
              }
            });
          }
          return next(action);
        }
        case types.LOGIN_REQUEST_FAILURE: {
          push('/');
          return next(action);
        }
        case types.LOGIN_REQUEST_SUCCESS: {
          const token = action.result.id_token;
          if (!token) {
            store.dispatch(appActions.showMessage('Login Error:','Error locating token in response', 'danger'));
            return next(action);
          }
          tryGetUsername(token, (username, error) => {
            if (error) {
              store.dispatch(appActions.showMessage('Login Error:', error.message, 'danger'));
              store.dispatch({ type: types.LOGIN_FAILURE, error });
            } else {
              storage.setItem(keys.ACCESS_TOKEN, token);
              store.dispatch({ type: types.LOGIN_SUCCESS, token: token, username: username });
            }
          });
          return next(action);
        }
        case types.LOGOUT_REQUEST:
          storage.removeItem(keys.ACCESS_TOKEN);
          store.dispatch({ type: types.LOGOUT_SUCCESS });
          store.dispatch(push('/'));
          return next(action);
        default:
          return next(action);
      }
    };
  };
}
