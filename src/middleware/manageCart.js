import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';
import * as actions from '../actions/cartActions';
import { jsonCartLocalStorage } from '../util/jsonCartStorage';

// NOTE: we can pass in a mock storage object here to unit test
export default function manageCartMiddleware(storage = jsonCartLocalStorage) {
  return (store) => {
    return (next) => (action) => {

      switch (action.type) {
        case types.ADD_TO_CART: {
          const cart = storage.getItem(keys.CART) || [];
          const cartEntry = cart.filter(({id}) => id === action.id);
          if (cartEntry.length) {
            storage.setItem(keys.CART, [...cart.filter(({id}) => id !== action.id), { id: action.id, count: cartEntry[0].count + 1 }]);
          } else {
            storage.setItem(keys.CART, [...cart, { id: action.id, count: 1 }]);
          }
          return next(action);
        }
        case types.REMOVE_FROM_CART: {
          const cart = storage.getItem(keys.CART);
          const cartEntry = cart.filter(({id}) => id === action.id);
          if (cartEntry.length && cartEntry[0].count === 1) {
            const newCart = cart.filter(({id}) => id !== action.id);
            storage.setItem(keys.CART, newCart);
            store.dispatch(actions.getCartItems(newCart.map(c => c.id))); // refresh the cart product info
          } else {
            storage.setItem(keys.CART, [...cart.filter(({id}) => id !== action.id), { id: action.id, count: cartEntry[0].count - 1 }]);
          }
          return next(action);
        }
        case types.INIT_CART: {
          const cart = storage.getItem(keys.CART) || [];
          store.dispatch({ type: types.FILL_CART, cart });
          return next(action);
        }
        default:
          return next(action);
      }
    };
  };
}
