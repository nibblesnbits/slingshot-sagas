import * as types from '../constants/actionTypes';

export function getAllProducts() {
  return {
    type: types.PRODUCT_REQUEST,
    method: 'GET'
  };
}

export function getProduct(id) {
  return {
    type: types.PRODUCT_REQUEST,
    method: 'GET',
    id
  };
}

export function deleteProduct(id) {
  return {
    type: types.PRODUCT_REQUEST,
    method: 'DELETE',
    id
  };
}

export function updateProduct(id) {
  return {
    type: types.PRODUCT_REQUEST,
    method: 'PUT',
    id
  };
}

export function createProduct(product) {
  return {
    type: types.PRODUCT_REQUEST,
    method: 'POST',
    product
  };
}
