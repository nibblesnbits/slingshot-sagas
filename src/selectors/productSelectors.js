import { createSelector } from 'reselect';

const createSort = (by) => (a, b) => {
  return a[by].localeCompare(b.name);
};

function filterByName(filter) {
  const regex = new RegExp(filter);
  return list => list.filter(p => {
    regex.test(p.name);
  });
}

const getProducts = (state) =>  state.products.list;
const getFilter = (state) => state.products.filter;
const getSortBy = (state) => state.products.sortBy;

const sortProducts = (products, by) =>  products.sort(createSort(by));
const filterAndSortProducts = (products, filter, sortBy) => products.filter(filterByName(filter).sort(createSort(sortBy)));

export const makeGetAndSortProducts = () => {
  return createSelector(
    [ getProducts, getFilter, getSortBy ],
    (products, filter, sortBy) => {
      if (filter) {
        return filterAndSortProducts(products);
      }
      return sortProducts(products, sortBy);
    }
  );
};
