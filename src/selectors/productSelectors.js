import { createSelector } from 'reselect';

const createSort = (by) => (a, b) => {
  return a[by].localeCompare(b[by]);
};

function filterByName(filter) {
  const regex = new RegExp(filter);
  return p => regex.test(p.name);
}

const getCartProducts = (state) => state.cart.products;
const getProducts = (state) => state.products.list;
const getFilter = (state) => state.products.filter;
const getSortBy = (state) => state.products.sortBy;

const sortProducts = (products, by) => products.sort(createSort(by));
const filterAndSortProducts = (products, filter, sortBy) => products.filter(filterByName(filter)).sort(createSort(sortBy));

export const makeGetAndSortProducts = () => {
  return createSelector(
    [getProducts, getFilter, getSortBy],
    (products, filter, sortBy) => {
      if (filter) {
        return filterAndSortProducts(products, filter, sortBy);
      }
      return sortProducts(products, sortBy);
    }
  );
};

export const makeGetAndSortCartProducts = () => {
  return createSelector(
    [getCartProducts, getFilter, getSortBy],
    (products, filter, sortBy) => {
      if (filter) {
        return filterAndSortProducts(products);
      }
      return sortProducts(products, sortBy);
    }
  );
};
