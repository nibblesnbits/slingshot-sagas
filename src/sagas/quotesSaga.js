import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';
import url from 'url';

const BASE_URL = 'http://localhost:4001/api/';

export function* getQuote({endpoint, config}) {
  const uri = url.resolve(BASE_URL, endpoint);
  try {
    yield* callApi(uri, config, [types.QUOTE_SUCCESS, types.QUOTE_FAILURE], "text");
  } catch (error) {
    yield put(appActions.showMessage('Login Error:', error.message, 'danger'));
  }
}

export function* watchGetQuotes() {
  yield* takeLatest(types.QUOTE_REQUEST, getQuote);
}
