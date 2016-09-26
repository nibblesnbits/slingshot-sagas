import * as types from '../constants/actionTypes';

export function getAllProducts() {
  return {
    type: types.READ_PRODUCTS_REQUEST,
  };
}

export function getProduct(id) {
  return {
    type: types.READ_PRODUCT_REQUEST,
    id
  };
}

export function deleteProduct(id) {
  return {
    type: types.DELETE_PRODUCT_REQUEST,
    id
  };
}

export function updateProduct(id, product) {
  return {
    type: types.UPDATE_PRODUCT_REQUEST,
    product
  };
}

export function createProduct(product) {
  return {
    type: types.CREATE_PRODUCT_REQUEST,
    product
  };
}
