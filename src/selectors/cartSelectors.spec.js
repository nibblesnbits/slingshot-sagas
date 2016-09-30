import { expect } from 'chai';
import { makeGetCartTotal } from './cartSelectors';

describe('cartSelectors', () => {
  describe('makeGetCartTotal', () => {
    it('should correctly total products', () => {
      const selector = makeGetCartTotal();

      const cart = [{
          id: 1,
          count: 1
        }, {
          id: 2,
          count: 1
        }
      ];
      const products = [{
          id: 1,
          price: 1
        }, {
          id: 2,
          price: 2
        }
      ];

      const result = selector({
        cart: {
          items: cart,
          products: products
        }
      });

      expect(result).to.equal(products[0].price + products[1].price);

    });
  });
});
