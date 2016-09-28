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
