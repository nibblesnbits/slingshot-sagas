import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import initialState from '../reducers/initialState';
import manageCartMiddleware from './manageCart';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/cartActions';
import * as keys from '../constants/storageKeys';

chai.use(sinonChai);

function createMockStore() {
    const store = {};
    store.setItem = function (key, val) {
      this[key] = val;
    };

    store.getItem = function (key) {
      return this[key];
    };

    return store;
}

describe('manageTokenMiddleware', () => {

  let localStorageMock;
  let store;
  beforeEach(() => {
    localStorageMock = createMockStore();
    sinon.spy(localStorageMock, 'setItem');
    sinon.spy(localStorageMock, 'getItem');

    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(manageCartMiddleware(localStorageMock))
    ));
  });

  it(`should add item to cart on ${types.ADD_TO_CART}`, (done) => {

    const unsubscribe = store.subscribe(() => {

      expect(localStorageMock.getItem.calledOnce).to.equal(true);
      expect(localStorageMock.setItem.calledOnce).to.equal(true);

      const cart = localStorageMock.getItem(keys.CART);
      expect(cart.length).to.equal(1);
      expect(cart[0].id).to.equal(1);
      expect(cart[0].count).to.equal(1);

      unsubscribe();
      done();
    });

    store.dispatch(actions.addToCart(1));
  });

  it(`should increment count for same item on ${types.ADD_TO_CART}`, (done) => {
    localStorageMock.setItem(keys.CART, [{
      id: 1,
      count: 1
    }]);

    const unsubscribe = store.subscribe(() => {
      expect(localStorageMock.getItem.calledOnce).to.equal(true);
      expect(localStorageMock.setItem.callCount).to.equal(2);

      const cart = localStorageMock.getItem(keys.CART);

      expect(cart.length).to.equal(1);
      expect(cart[0].id).to.equal(1);
      expect(cart[0].count).to.equal(2);
      unsubscribe();
      done();
    });

    store.dispatch(actions.addToCart(1));
  });

  it(`should decrement count for same item on ${types.REMOVE_FROM_CART}`, (done) => {

    const totalDispatches = 3;
    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls < totalDispatches) return; // don't check until after GET_CART_PRODUCTS

      expect(localStorageMock.getItem.callCount).to.equal(totalDispatches);
      expect(localStorageMock.setItem.callCount).to.equal(totalDispatches);

      const cart = localStorageMock.getItem(keys.CART);

      expect(cart.length).to.equal(1);
      expect(cart[0].id).to.equal(1);
      expect(cart[0].count).to.equal(1);

      unsubscribe();
      done();
    });

    store.dispatch(actions.addToCart(1));
    store.dispatch(actions.addToCart(1));
    store.dispatch(actions.removeFromCart(1));
  });

  it(`should remove item when count is 1 on ${types.REMOVE_FROM_CART}`, (done) => {

    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls === 1) return; // don't check until after GET_CART_PRODUCTS

      expect(localStorageMock.getItem.callCount).to.equal(2);
      expect(localStorageMock.setItem.callCount).to.equal(2);

      const cart = localStorageMock.getItem(keys.CART);

      expect(cart.length).to.equal(0);
      unsubscribe();
      done();
    });

    store.dispatch(actions.addToCart(1));
    store.dispatch(actions.removeFromCart(1));
  });

  it(`should fill cart on ${types.INIT_CART}`, (done) => {

    localStorageMock.setItem(keys.CART, [{
      id: 1,
      count: 1
    }]);

    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls === 1) return;
      expect(localStorageMock.getItem.calledOnce).to.equal(true);

      unsubscribe();
      done();
    });

    store.dispatch(actions.initCart());
  });
});
