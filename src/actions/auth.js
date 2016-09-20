import * as types from '../constants/actionTypes';

export function login(creds) {
  return {
    type: types.LOGIN_REQUEST,
    ...creds
  };
}

export function logout() {
  return {
    type: types.LOGOUT_REQUEST
  };
}
