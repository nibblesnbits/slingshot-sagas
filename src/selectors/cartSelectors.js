import { createSelector } from 'reselect';


const getCartProducts = (state) => state.cart.products;
const getCart = (state) => state.cart.items;

export const makeGetCartTotal = () => {
  return createSelector(
    [ getCartProducts, getCart ],
    (products, cart) => {
      const total = products.reduce((acc, cur) => {
        const item = cart.filter(i => i.id === cur.id);
        if (item.length) {
          return ((acc || 0) + cur.price) * item[0].count;
        }
        return ((acc || 0) + cur.price);
      }, 0);
      return total;
    }
  );
};
