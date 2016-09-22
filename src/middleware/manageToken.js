import { push } from 'react-router-redux';
import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';
import { parseJwt } from '../util/jwtParser';

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
        case types.CHECK_CREDS: {
          const token = store.getState().auth.token || storage.getItem(keys.ACCESS_TOKEN);
          if (token) {
            const { payload } = parseJwt(token);
            const username = payload.username;
            store.dispatch({ type: types.LOGIN_SUCCESS, token: token, username: username });
          }
          return next(action);
        }
        case types.LOGIN_REQUEST_SUCCESS: {
          const token = action.result.access_token;
          storage.setItem(keys.ACCESS_TOKEN, token);
          const { payload } = parseJwt(token);
          const username = payload.username;
          store.dispatch({ type: types.LOGIN_SUCCESS, token: token, username: username });
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
