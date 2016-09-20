import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';


export default function storeTokenMiddleware({getState}) {
  return (next) => (action) => {
    const actionResult = next(action);
    if (actionResult.result && actionResult.result.access_token) {
      localStorage.setItem(keys.ACCESS_TOKEN, actionResult.result.access_token);
    }
    if (actionResult.type == types.LOGOUT_REQUEST) {
      localStorage.removeItem(keys.ACCESS_TOKEN);
    }
    return actionResult;
  };
};
