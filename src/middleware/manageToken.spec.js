import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import initialState from '../reducers/initialState';
import manageTokenMiddleware from './manageToken';
import * as types from '../constants/actionTypes';
import * as keys from '../constants/storageKeys';

chai.use(sinonChai);

function createMockStore() {
    const store = {};
    store.setItem = function (key, val) {
      this[key] = val + '';
    };

    store.getItem = function (key) {
      return this[key];
    };

    store.removeItem = function (key) {
      delete this[key];
    };

    Object.defineProperty(store, 'length', {
      get: function () { return Object.keys(this).length - 2; }
    });

    return store;
}

describe('manageTokenMiddleware', () => {

  let localStorageMock;
  let store;
  beforeEach(() => {
    localStorageMock = createMockStore();
    sinon.spy(localStorageMock, 'setItem');
    sinon.spy(localStorageMock, 'getItem');
    sinon.spy(localStorageMock, 'removeItem');

    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(manageTokenMiddleware(localStorageMock))
      )
    );
  });

  it(`should call getItem on storage on ${types.CHECK_CREDS}`, () => {
    const action = { type: types.CHECK_CREDS };

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });

  it(`should call setItem on storage on ${types.LOGIN_SUCCESS}`, () => {
    const action = { type: types.LOGIN_SUCCESS, result: { access_token: 'test' } };

    store.dispatch(action);

    expect(localStorageMock.setItem.calledOnce).to.be.true;
  });

  it(`should call removeItem on storage on ${types.LOGOUT_REQUEST}`, () => {
    const action = { type: types.LOGOUT_REQUEST };

    store.dispatch(action);

    expect(localStorageMock.removeItem.calledOnce).to.be.true;
  });

  it('should add a config and header to requests with "useToken"', () => {
    const token = 'test';
    localStorageMock.setItem(keys.ACCESS_TOKEN, token);
    const action = { type: 'TEST_REQUEST', useToken: true };

    const result = store.dispatch(action);
    expect(result.config.headers.Authorization).to.be.equal(`Bearer ${token}`);
  });

  it(`should get access token on ${types.CHECK_CREDS}`, () => {
    const token = 'test';
    localStorageMock.setItem(keys.ACCESS_TOKEN, token);
    const action = { type: types.CHECK_CREDS };

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });
});


