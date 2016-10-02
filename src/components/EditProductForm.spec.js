import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import EditProductForm from './EditProductForm';
import * as actions from '../actions/productActions';

describe('<EditProductForm />', () => {

  let store;

  beforeEach((done) => {
    store = createStore(rootReducer, initialState);

    const unsubscribe = store.subscribe(() => {
      unsubscribe();
      done();
    });

    store.dispatch(actions.showEditModal({
      id: 0,
      name: 'test',
      description: 'test',
      price: 1
    }));
  });

  it('should render the values form state into the form', () => {

    const wrapper = mount(
      <Provider store={store}>
        <EditProductForm />
      </Provider>
    );

    const priceField = wrapper.find('input[name="price"]');
    const nameField = wrapper.find('input[name="name"]');

    expect(priceField.length).to.equal(1);
    expect(nameField.length).to.equal(1);

    expect(priceField.props().value).to.equal(1);
    expect(nameField.props().value).to.equal('test');
  });
});
