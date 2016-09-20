import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';

export default function manageTokenMiddleware(store) {
  return (next) => (action) => {
    switch (action.type) {
      case types.CHECK_CREDS:
        const token = localStorage.getItem(keys.ACCESS_TOKEN);
        if (token) {
          store.dispatch({ type: types.LOGIN_SUCCESS, result: { access_token: token } });
        }
        return next(action);
      case types.LOGIN_SUCCESS:
        const result = next(action);
        localStorage.setItem(keys.ACCESS_TOKEN, result.access_token);
        return result;
      case types.LOGOUT_REQUEST:
        localStorage.removeItem(keys.ACCESS_TOKEN);
        return next(action);
      default:
        return next(action);
    }
  };
};
