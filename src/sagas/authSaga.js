import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';
import { parseJwt } from '../util/jwtParser';

export function* login({username, password}) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `grant_type=password&username=${username}&password=${password}&client_id=Centeva`
  };
  const url = "http://localhost:3001/sessions/create";

  try {
    const response = yield* callApi(url, config, [types.LOGIN_SUCCESS, types.LOGIN_FAILURE]);
    const { payload } = parseJwt(response.access_token);
    const username = payload.username;
    yield put(appActions.showToast('Success!', `logged in as ${username}`,'success'));
  } catch(error) {
    const text = typeof(error) === "string" ? error : (typeof(error) === "object" && error.message ? error.message : "Unknown Error");
    yield put(appActions.showMessage('Login Error:', text, 'danger'));
  }
}

function* logout() {
  yield put({type: types.LOGOUT_SUCCESS});
}

export function* watchLogin() {
  yield* takeLatest(types.LOGIN_REQUEST, login);
}

export function* watchLogout() {
  yield* takeLatest(types.LOGOUT_REQUEST, logout);
}
