import { expect } from 'chai';
import cartReducer from './cartReducer';
import * as actions from '../actions/cartActions';
import * as types from '../constants/actionTypes';
import initialState from './initialState';

describe('App Reducer', () => {

  let state;
  beforeEach(() => {
    state = {
      ...initialState.cart
    };
  });

  it ('should add item with a count on addToCart()', () => {
    const action = actions.addToCart(1);

    const newState = cartReducer(state, action);

    expect(newState.items.length).to.equal(1);
    expect(newState.items[0]).to.deep.equal({ id: 1, count: 1});
  });

  it ('should remove items from cart on removeFromCart()', () => {

    const newState =
      cartReducer(
        cartReducer(
          cartReducer(state,
          actions.addToCart(1)),
        actions.addToCart(2)),
      actions.removeFromCart(1));

    expect(newState.items.length).to.equal(1);
    expect(newState.items[0]).to.deep.equal({ id: 2, count: 1});
  });

  it ('should decrement count from cart on removeFromCart()', () => {

    const newState =
      cartReducer(
        cartReducer(
          cartReducer(state,
          actions.addToCart(1)),
        actions.addToCart(1)),
      actions.removeFromCart(1));

    expect(newState.items.length).to.equal(1);
    expect(newState.items[0]).to.deep.equal({ id: 1, count: 1});
  });

  it ('should fill cart with items on fillCart()', () => {
    const action = {
      type: types.FILL_CART,
      cart: [{id: 1, count: 1}]
    };

    const newState = cartReducer(state, action);

    expect(newState.items.length).to.equal(1);
    expect(newState.items[0]).to.deep.equal({ id: 1, count: 1});
  });

  it (`should fill product list with product info on ${types.GET_CART_PRODUCTS_SUCCESS}`, () => {
    const product = { id: 1, name: 'test' };
    const action = {
      type: types.GET_CART_PRODUCTS_SUCCESS,
      result: [product]
    };

    const newState = cartReducer(state, action);

    expect(newState.products.length).to.equal(1);
    expect(newState.products[0]).to.deep.equal(product);
  });

});
