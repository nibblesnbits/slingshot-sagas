import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import ConnectedCartProductList, { CartProductList } from './CartProductList'; // eslint-disable-line import/no-named-as-default
import * as types from '../constants/actionTypes';

chai.use(sinonChai);

describe('<CartProductList />', () => {

  describe('without redux', () => {

    it('should render a CartProductDisplay for each product', () => {
      const props = {
        removeFromCart: sinon.spy(),
        products: [{
          id: 0,
          name: 'test',
          price: 0,
          description: 'test'
        }],
        cart: []
      };

      const wrapper = mount(<CartProductList {...props} />);
      const displays = wrapper.find('CartProductDisplay');

      expect(displays.length).to.equal(props.products.length);
    });

    it('should call removeFromCart() on remove button click', () => {
      const props = {
        removeFromCart: sinon.spy(),
        products: [{
          id: 0,
          name: 'test',
          price: 0,
          description: 'test'
        }],
        cart: []
      };

      const wrapper = mount(<CartProductList {...props} />);
      const button = wrapper.find('button');
      expect(button.length).to.equal(1);

      button.simulate('click');

      expect(props.removeFromCart.calledOnce).to.equal(true);
    });
  });

  describe('with redux', () => {

    const products = [{
      id: 1,
      name: 'test',
      description: 'test',
      price: 1
    }];
    let store;
    beforeEach((done) => {
      store = createStore(rootReducer, initialState);
      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return;
        unsubscribe();
        done();
      });
      store.dispatch({
        type: types.PRODUCT_REQUEST_SUCCESS,
        result: [...products]
      });
      store.dispatch({
        type: types.GET_CART_PRODUCTS_SUCCESS,
        result: [...products]
      });
    });

    it('should render a CartProductDisplay for each product', () => {

      const wrapper = mount(
        <Provider store={store}>
          <ConnectedCartProductList />
        </Provider>
      );
      const displays = wrapper.find('CartProductDisplay');

      expect(displays.length).to.equal(1);
    });
  });
});
