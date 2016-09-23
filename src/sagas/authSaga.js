import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';

export function* login({username, password}) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `grant_type=password&username=${username}&password=${password}&client_id=Redux`
  };
  const url = "http://localhost:3001/sessions/create";

  try {
    yield* callApi(url, config, [types.LOGIN_REQUEST_SUCCESS, types.LOGIN_REQUEST_FAILURE]);
  } catch(error) {
    const text = typeof(error) === "string" ? error : (typeof(error) === "object" && error.message ? error.message : "Unknown Error");
    yield put(appActions.showMessage('Login Error:', text, 'danger'));
  }
}

export function* watchLogin() {
  yield* takeLatest(types.LOGIN_REQUEST, login);
}
