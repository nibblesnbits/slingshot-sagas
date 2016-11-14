import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
import url from 'url';
import { STORE_SERVER_URL } from '../config';

const DefaultConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

export function* getProductsRequest() {

  const config = {
    ...DefaultConfig,
    method: 'GET'
  };
  const uri = url.resolve(STORE_SERVER_URL, '/api/products');

  try {
    yield call(callApi, () => fetch(uri, config), [types.PRODUCTS_REQUEST_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* getProductRequest({ id }) {

  const config = {
    ...DefaultConfig,
    method: 'GET'
  };
  const uri = url.resolve(STORE_SERVER_URL, '/api/products/' + id);

  try {
    yield call(callApi, () => fetch(uri, config), [types.PRODUCT_REQUEST_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
  } catch(error) {
    yield put(appActions.showToast('Request Error:', error.message, 'danger'));
  }
}

export function* deleteProductRequest({id}) {

  const config = {
    ...DefaultConfig,
    method: 'DELETE'
  };
  const uri = url.resolve(STORE_SERVER_URL, '/api/products/' + id);

  try {
    const product = yield call(callApi, () => fetch(uri, config), [types.DELETE_PRODUCT_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
    yield put(appActions.showToast('Deleted Product:', product.name, 'info'));
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* updateProductRequest({ product }) {
  const config = {
    ...DefaultConfig,
    method: 'PUT',
    body: JSON.stringify(product)
  };
  const uri = url.resolve(STORE_SERVER_URL, '/api/products');

  try {
    yield call(callApi, () => fetch(uri, config), [types.UPDATE_PRODUCT_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
    yield put(appActions.showToast('Updated Product:', product.name, 'info'));
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* createProductRequest({ product }) {

  const config = {
    ...DefaultConfig,
    method: 'POST',
    body: JSON.stringify(product)
  };
  const uri = url.resolve(STORE_SERVER_URL, '/api/products');

  try {
    yield call(callApi, () => fetch(uri, config), [types.CREATE_PRODUCT_SUCCESS, types.PRODUCT_REQUEST_FAILURE]);
    yield put(appActions.showToast('Created Product:', product.name, 'info'));
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* watchCreateProductRequest() {
  yield* takeEvery(types.CREATE_PRODUCT_REQUEST, createProductRequest);
}

export function* watchReadProductsRequest() {
  yield* takeEvery(types.READ_PRODUCTS_REQUEST, getProductsRequest);
}

export function* watchReadProductRequest() {
  yield* takeEvery(types.READ_PRODUCT_REQUEST, getProductRequest);
}

export function* watchUpdateProductRequest() {
  yield* takeEvery(types.UPDATE_PRODUCT_REQUEST, updateProductRequest);
}

export function* watchDeleteProductRequest() {
  yield* takeEvery(types.DELETE_PRODUCT_REQUEST, deleteProductRequest);
}


// function isDef(obj) {
//   return typeof obj !== "undefined";
// }
