import { expect } from 'chai';
import { makeGetAndSortProducts, makeGetAndSortCartProducts } from './productSelectors';

const createSort = (by) => (a, b) => {
  return a[by].localeCompare(b.name);
};

function filterByName(filter) {
  const regex = new RegExp(filter);
  return list => list.filter(p => {
    regex.test(p.name);
  });
}

describe('productSelectors', () => {
  describe('makeGetAndSortProducts', () => {
    it('should correctly sort products', () => {
      const selector = makeGetAndSortProducts();

      const products = [{
          id: 2,
          name: 'a'
        }, {
          id: 1,
          name: 'b'
        }
      ];

      const result = selector({
        products: {
          list: products,
          filter: '',
          sortBy: 'name'
        }
      });

      expect(result).to.deep.equal(products.sort(createSort('name')));

    });

    it('should correctly filter products', () => {
      const selector = makeGetAndSortProducts();

      const products = [{
          id: 2,
          name: 'a'
        }, {
          id: 1,
          name: 'b'
        }
      ];

      const result = selector({
        products: {
          list: products,
          filter: 'a',
          sortBy: 'name'
        }
      });

      expect(result).to.deep.equal(products.filter(p => p.name === 'a'));

    });
  });
});
