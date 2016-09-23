import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import initialState from '../reducers/initialState';
import manageTokenMiddleware from './manageToken';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/auth';
import * as keys from '../constants/storageKeys';
import decode from 'jwt-decode';

chai.use(sinonChai);

const exampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.Y0M_wkxFaw2R8ZQUT1-nAd_2zKtzBs2almfUwZposoM";

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
    const action = actions.checkCreds();

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });

  it(`should call setItem on storage on ${types.LOGIN_REQUEST_SUCCESS}`, (done) => {
    const action = { type: types.LOGIN_REQUEST_SUCCESS, result: { id_token: exampleToken } };

    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls === 1) return; // skip the LOGIN_REQUEST_SUCCESS action
      expect(localStorageMock.setItem.calledOnce).to.be.true;
      expect(store.getState().auth.token).to.be.equal(exampleToken);
      unsubscribe();
      done();
    });
    store.dispatch(action);


  });

  it(`should call removeItem on storage on ${types.LOGOUT_REQUEST}`, () => {
    const action = actions.logout();

    store.dispatch(action);

    expect(localStorageMock.removeItem.calledOnce).to.be.true;
  });


  it(`should dispatch ${types.LOGIN_SUCCESS} with access token and username on ${types.CHECK_CREDS}`, (done) => {
    localStorageMock.setItem(keys.ACCESS_TOKEN, exampleToken);
    const action = actions.checkCreds();

    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls === 1) return; // skip the CHECK_CREDS action
      expect(localStorageMock.getItem.calledOnce).to.be.true;
      expect(store.getState().auth.token).to.be.equal(exampleToken);
      expect(store.getState().auth.username).to.be.equal(decode(exampleToken).username);
      unsubscribe();
      done();
    });

    store.dispatch(action);
  });

  it(`should get access token on ${types.CHECK_CREDS}`, () => {
    localStorageMock.setItem(keys.ACCESS_TOKEN, exampleToken);
    const action = actions.checkCreds();

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });

  it('should add a config and Authorization header to actions with "useToken"', () => {
    localStorageMock.setItem(keys.ACCESS_TOKEN, exampleToken);
    const action = { type: 'TEST_REQUEST', useToken: true };

    store.dispatch({ type: types.CHECK_CREDS }); // load the token into state
    const result = store.dispatch(action);
    expect(result.config.headers.Authorization).to.be.equal(`Bearer ${exampleToken}`);
  });
});
