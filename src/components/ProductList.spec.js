import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import ConnectedProductList, { ProductList } from './ProductList';
import * as types from '../constants/actionTypes';

describe('<ProductList />', () => {

  describe('with redux', () => {

    let store;
    const productsResult = [{
      id: 1,
      name: 'test',
      description: 'test',
      price: 1
    }];
    beforeEach((done) => {
      store = createStore(rootReducer, initialState);
      const unsubscribe = store.subscribe(() => {
        unsubscribe();
        done();
      });
      store.dispatch({
        type: types.PRODUCTS_REQUEST_SUCCESS,
        result: productsResult
      });
    });

    it('should render a ProductDisplay for each product', () => {

      const wrapper = mount(
        <Provider store={store}>
          <ConnectedProductList />
        </Provider>
      );

      const productDisplays = wrapper.find('ProductDisplay');

      expect(productDisplays.length).to.equal(productsResult.length);
    });
  });

  describe('without redux', () => {

    it('should render a ProductDisplay for each product', () => {
      const props = {
        products: [{
          id: 1,
          price: 1,
          name: 'test',
          description: 'test',
        }],
        addToCart: () => null
      };

      const wrapper = mount(<ProductList {...props} />);

      const productDisplays = wrapper.find('ProductDisplay');

      expect(productDisplays.length).to.equal(props.products.length);
    });
  });
});
