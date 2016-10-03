import { expect } from 'chai';
import productReducer from './productReducer';
import * as actions from '../actions/productActions';
import * as types from '../constants/actionTypes';
import initialState from './initialState';

describe('Product Reducer', () => {

  it ('should set isFetching to true on all request actions', () => {

    let newState = productReducer({ ...initialState.products }, actions.updateProduct({}));
    expect(newState.isFetching).to.equal(true);

    newState = productReducer({ ...initialState.products }, actions.deleteProduct(0));
    expect(newState.isFetching).to.equal(true);

    newState = productReducer({ ...initialState.products }, actions.createProduct({}));
    expect(newState.isFetching).to.equal(true);

    newState = productReducer({ ...initialState.products }, actions.getProduct(0));
    expect(newState.isFetching).to.equal(true);

    newState = productReducer({ ...initialState.products }, actions.getAllProducts());
    expect(newState.isFetching).to.equal(true);
  });

  it ('should set isFetching to false on all request completions', () => {

    let newState = productReducer({ ...initialState.products, isFetching: true }, { type: types.PRODUCTS_REQUEST_SUCCESS });
    expect(newState.isFetching).to.equal(false);

    newState = productReducer({ ...initialState.products, isFetching: true }, { type: types.PRODUCT_REQUEST_SUCCESS });
    expect(newState.isFetching).to.equal(false);

    newState = productReducer({ ...initialState.products, isFetching: true }, { type: types.UPDATE_PRODUCT_SUCCESS });
    expect(newState.isFetching).to.equal(false);

    newState = productReducer({ ...initialState.products, isFetching: true }, { type: types.DELETE_PRODUCT_SUCCESS });
    expect(newState.isFetching).to.equal(false);

    newState = productReducer({ ...initialState.products, isFetching: true }, { type: types.PRODUCT_REQUEST_FAILURE });
    expect(newState.isFetching).to.equal(false);
  });

  it ('should set editing values on modal actions', () => {

    const product = {
      id: 0,
      name: 'test'
    };
    const action = actions.showEditModal(product);

    let newState = productReducer({ ...initialState.products }, action);
    expect(newState.editing.modalOpen).to.equal(true);
    expect(newState.editing.product).to.deep.equal(product);

    newState = productReducer(newState, actions.closeEditModal());
    expect(newState.editing.modalOpen).to.equal(false);

  });

  it (`should set product list on ${types.UPDATE_PRODUCT_SUCCESS}`, () => {

    const state = {
      list: [{
        id: 1,
        name: 'test'
      },{
        id: 2,
        name: 'test'
      }]
    };
    const newName = 'test2';
    const action = {
      type: types.UPDATE_PRODUCT_SUCCESS,
      result: {
        id: 1,
        name: newName
      }
    };

    let newState = productReducer(state, action);
    expect(newState.list[1].name).to.equal(newName);
  });

  it (`should set product list on ${types.CREATE_PRODUCT_SUCCESS}`, () => {

    const state = {
      list: [{
        id: 1,
        name: 'test'
      },{
        id: 2,
        name: 'test'
      }]
    };
    const action = {
      type: types.CREATE_PRODUCT_SUCCESS,
      result: {
        id: 3,
        name: 'test3'
      }
    };

    let newState = productReducer(state, action);
    expect(newState.list[2].name).to.equal('test3');
  });

  it (`should set product list on ${types.DELETE_PRODUCT_SUCCESS}`, () => {

    const state = {
      list: [{
        id: 1,
        name: 'test'
      },{
        id: 2,
        name: 'test'
      }]
    };
    const action = {
      type: types.DELETE_PRODUCT_SUCCESS,
      result: {
        id: 1
      }
    };

    let newState = productReducer(state, action);
    expect(newState.list[0].id).to.equal(2);
  });

  it (`should set error on ${types.PRODUCT_REQUEST_FAILURE}`, () => {

    const error = {
      message: 'test'
    };
    const action = {
      type: types.PRODUCT_REQUEST_FAILURE,
      error
    };

    let newState = productReducer({ ...initialState.products }, action);
    expect(newState.error).to.deep.equal(error);
  });

});
