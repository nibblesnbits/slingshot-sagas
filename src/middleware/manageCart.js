import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';

const jsonCartLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => JSON.parse(localStorage.getItem(key))
};

// NOTE: we can pass in a mock storage object here to unit test
export default function manageCartMiddleware(storage = jsonCartLocalStorage) {
  return (_store) => {
    return (next) => (action) => {

      switch (action.type) {
        case types.ADD_TO_CART: {
          let cart = storage.getItem(keys.CART) || [];
          cart = [ ...cart, action.id];
          storage.setItem(keys.CART, cart);
          return next(action);
        }
        case types.REMOVE_FROM_CART: {
          let cart = storage.getItem(keys.CART);
          cart = cart.filter(id => id !== action.id);
          storage.setItem(keys.CART, cart);
          return next(action);
        }
        default:
          return next(action);
      }
    };
  };
}
