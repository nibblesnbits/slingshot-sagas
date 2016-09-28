import * as types from '../constants/actionTypes';

export function login(creds) {
  return {
    type: types.LOGIN_REQUEST,
    ...creds
  };
}

export function checkCreds() {
  return {
    type: types.CHECK_CREDS
  };
}

export function logout() {
  return {
    type: types.LOGOUT_REQUEST
  };
}


export function requireLogin(redirectTo) {
  return {
    type: types.LOGIN_REQUIRED,
    redirectTo
  };
}
