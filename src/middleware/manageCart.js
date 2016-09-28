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
  return (store) => {
    return (next) => (action) => {

      switch (action.type) {
        case types.ADD_TO_CART: {
          const cart = storage.getItem(keys.CART) || [];
          storage.setItem(keys.CART, [ ...cart, { id: action.id, count: cart.length ? cart.reduce((a, b) => a.id === b.id ? 1 : 0 ) : 1 } ]);
          return next(action);
        }
        case types.REMOVE_FROM_CART: {
          const cart = storage.getItem(keys.CART);
          const newItemCount = cart.filter(({id}) => id === action.id).reduce((a, b) => a.id === b.id ? 1 : 0 ) + 1;
          storage.setItem(keys.CART, [ ...cart.filter(({id}) => id !== action.id), { id: action.id, count: newItemCount } ]);
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
