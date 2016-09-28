import * as types from '../constants/actionTypes';

export function addToCart(id) {
  return {
    type: types.ADD_TO_CART,
    id
  };
}

export function removeFromCart(id) {
  return {
    type: types.REMOVE_FROM_CART,
    id
  };
}

export function initCart() {
  return {
    type: types.INIT_CART
  };
}

export function getCartItems(ids) {
  return {
    type: types.GET_CART_PRODUCTS,
    ids
  };
}
