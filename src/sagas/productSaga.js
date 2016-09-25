import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
import url from 'url';

const BASE_URL = "http://localhost:5001/";

export function* productRequest({method, id}) {

  const config = {
    method: method
  };
  const uri = url.resolve(BASE_URL, isDef(id) ? '/' + id : '');

  try {
    yield call(callApi, uri, config, [types.PRODUCT_REQUEST_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Login Error:', error.message, 'danger'));
  }
}

export function* watchProductRequest() {
  yield* takeLatest(types.PRODUCT_REQUEST, productRequest);
}

function isDef(obj) {
  return typeof obj !== "undefined";
}
