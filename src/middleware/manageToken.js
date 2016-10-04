import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
import * as authActions from '../actions/authActions';
import * as keys from '../constants/storageKeys';
import decode from 'jwt-decode';
import { getTokenFromResult } from '../selectors/tokenSelectors';

function tryGetProperties(token, cb) {
  try {
    const decoded = decode(token);
    cb(decoded);
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
          store.dispatch(push(action.redirectTo));
          return next(action);
        }
        case types.CHECK_CREDS: {
          const token = store.getState().auth.token || storage.getItem(keys.ACCESS_TOKEN);
          if (token) {
            tryGetProperties(token, (properties, error) => {
              if (error) {
                store.dispatch({ type: types.LOGIN_FAILURE, error });
                store.dispatch(authActions.requireLogin('/'));
              } else {
                store.dispatch({ type: types.LOGIN_SUCCESS, token: token, ...properties });
              }
            });
          }
          return next(action);
        }
        case types.LOGIN_REQUEST_SUCCESS: {
          const token = getTokenFromResult(action.result);
          if (!token) {
            store.dispatch({ type: types.LOGIN_FAILURE, error: { message: 'Error locating token in response' } });
            return next(action);
          }
          tryGetProperties(token, (properties, error) => {
            if (error) {
              store.dispatch({ type: types.LOGIN_FAILURE, error });
            } else {
              storage.setItem(keys.ACCESS_TOKEN, token);
              store.dispatch({ type: types.LOGIN_SUCCESS, token, ...properties });
            }
          });
          return next(action);
        }
        case types.LOGIN_FAILURE: {
          store.dispatch(appActions.showMessage('Login Error:', action.error.message, 'danger'));
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
