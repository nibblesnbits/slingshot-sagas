import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import EditProductModal from './EditProductModal'; // eslint-disable-line import/no-named-as-default
import * as actions from '../actions/productActions';

describe('<EditProductModal />', () => {

  let store;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);

    store.dispatch(actions.showEditModal({
      id: 0,
      name: 'test',
      description: 'test',
      price: 1
    }));
  });

  it('should... ?', () => {

    const wrapper = mount(
      <Provider store={store}>
        <EditProductModal />
      </Provider>
    );

    expect(wrapper).to.not.be.undefined;
  });
});
