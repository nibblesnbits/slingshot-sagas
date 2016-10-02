import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import ConnectedCartSummary, { CartSummary } from './CartSummary';
import * as types from '../constants/actionTypes';

describe('<CartSummary />', () => {

  describe('with redux', () => {

    let store;
    beforeEach((done) => {
      store = createStore(rootReducer, initialState);
      const unsubscribe = store.subscribe(() => {
        unsubscribe();
        done();
      });
      store.dispatch({
        type: types.GET_CART_PRODUCTS_SUCCESS,
        result: [{
            id: 1,
            name: 'test',
            description: 'test',
            price: 1
          }]
      });
    });

    it('should total cart', () => {

      const wrapper = mount(
        <Provider store={store}>
          <ConnectedCartSummary />
        </Provider>
      );

      const total = wrapper.find('.cart-subtotal');

      expect(total.text()).to.equal("$1.00");
    });
  });

  describe('without redux', () => {
    it('should total cart', () => {
      const props = {
        total: 1
      };

      const wrapper = mount(<CartSummary {...props} />);

      const total = wrapper.find('.cart-subtotal');

      expect(total.text()).to.equal("$1.00");
    });
  });
});
