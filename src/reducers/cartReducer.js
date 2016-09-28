import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
    debugger;
      return {
        ...state,
        items: [...state.items, action.id]
      };
    case types.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(id => id !== action.id)
      };
    default:
      return state;
  }
}
