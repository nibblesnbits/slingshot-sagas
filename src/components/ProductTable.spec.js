import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import ProductTable from './ProductTable'; // eslint-disable-line import/no-named-as-default
// import * as actions from '../actions/productActions';


describe('<ProductTable />', () => {

  let store;
  beforeEach((done) => {
    store = createStore(rootReducer, initialState);
    const unsubscribe = store.subscribe(() => {
      unsubscribe();
      done();
    });
    store.dispatch({
      type: 'PRODUCT_REQUEST_SUCCESS',
      result: [{
          id: 1,
          name: 'test',
          description: 'test',
          price: 1
        }]
    });
  });

  it('should render a ProductTableRow for each product', () => {

    const wrapper = mount(
      <Provider store={store}>
        <ProductTable />
      </Provider>
    );

    const productDisplays = wrapper.find('ProductTableRow');

    expect(productDisplays.length).to.equal(1);
  });
});
