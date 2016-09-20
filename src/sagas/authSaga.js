import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';
import { parseJwt } from '../util/jwtParser';
import { setItem, removeItem } from '../util/storage';
import * as keys from '../constants/storageKeys';

export function* login({username, password}) {

  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `grant_type=password&username=${username}&password=${password}&client_id=Centeva`
  };
  const url = "http://localhost:3001/sessions/create";

  try {
    const result = yield* callApi(url, config, [types.LOGIN_SUCCESS, types.LOGIN_FAILURE]);
    setItem(keys.ACCESS_TOKEN, result.access_token);
    const { payload } = parseJwt(result.access_token);
    const username = payload.username;
    yield put(appActions.showToast('Success!', `logged in as ${username}`,'success'));
  } catch(error) {
    yield put(appActions.showMessage('Login Error:', error.message, 'danger'));
  }
}

function* logout() {
  removeItem(keys.ACCESS_TOKEN);
  yield put({type: types.LOGOUT_SUCCESS});
}

export function* watchLogin() {
  yield* takeLatest(types.LOGIN_REQUEST, login);
}

export function* watchLogout() {
  yield* takeLatest(types.LOGOUT_REQUEST, logout);
}
