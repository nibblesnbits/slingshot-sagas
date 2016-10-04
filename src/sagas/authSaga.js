import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';

export function* login({username, password}) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `grant_type=password&username=${username}&password=${password}&client_id=Redux`
  };
  const url = "http://localhost:4001/sessions/create";

  try {
    yield call(callApi, () => fetch(url, config), [types.LOGIN_REQUEST_SUCCESS, types.LOGIN_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Login Error:', error.message, 'danger'));
  }
}

export function* watchLogin() {
  yield* takeLatest(types.LOGIN_REQUEST, login);
}
