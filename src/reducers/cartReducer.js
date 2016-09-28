import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function cartReducer(state = initialState.cart, action) {
  switch (action.type) {
    case types.ADD_TO_CART: {
      const cartEntry = state.items.filter(({id}) => id === action.id);
      if (cartEntry.length) {
        return {
          ...state,
          items: [...state.items.filter(({id}) => id !== action.id), { id: action.id, count: cartEntry[0].count + 1 }]
        };
      }
      return {
        ...state,
        items: [...state.items, { id: action.id, count: 1 }]
      };
    }
    case types.REMOVE_FROM_CART: {
      const cartEntry = state.items.filter(({id}) => id === action.id);
      if (cartEntry.length && cartEntry[0].count === 1) {
        return {
          ...state,
          items: [...state.items.filter(({id}) => id !== action.id)]
        };
      }
      return {
        ...state,
        items: [...state.items.filter(({id}) => id !== action.id), { id: action.id, count: cartEntry[0].count - 1 }]
      };
    }
    case types.FILL_CART: {
      return {
        ...state,
        items: action.cart
      };
    }
    case types.GET_CART_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.result
      };
    }
    default:
      return state;
  }
}
