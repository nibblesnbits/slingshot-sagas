import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case types.ADD_TO_CART:
      return {
        ...state,
        items: [ ...state.items, { id: action.id, count: state.items.length ? state.items.reduce((a, b) => a.id === b.id ? 1 : 0 ) : 1 } ]
      };
    case types.REMOVE_FROM_CART: {
      const newItemCount = state.items.filter(({id}) => id === action.id).reduce((a, b) => a.id === b.id ? 1 : 0 ) + 1;
      return {
        ...state,
        items: [ ...state.items.filter(({id}) => id !== action.id), { id: action.id, count: newItemCount } ]
      };
    }
    case types.FILL_CART: {
      return {
        ...state,
        items: action.cart
      };
    }
    default:
      return state;
  }
}
