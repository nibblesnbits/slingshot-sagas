import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import callApi from './helpers';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/appActions';
import url from 'url';

const BASE_URL = "http://localhost:5001/api/";

const DefaultConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

export function* getCartProducts({ ids }) {

  const config = {
    ...DefaultConfig,
    method: 'POST',
    body: JSON.stringify(ids)
  };
  const uri = url.resolve(BASE_URL, 'cart/products');

  try {
    yield call(callApi, () => fetch(uri, config), [types.GET_CART_PRODUCTS_SUCCESS, types.GET_CART_PRODUCTS_FAILURE]);
  } catch(error) {
    yield put(appActions.showMessage('Request Error:', error.message, 'danger'));
  }
}

export function* watchGetCartProductsRequest() {
  yield* takeEvery(types.GET_CART_PRODUCTS, getCartProducts);
}


// function isDef(obj) {
//   return typeof obj !== "undefined";
// }
