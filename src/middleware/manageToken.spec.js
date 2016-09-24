import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createMemoryHistory  } from 'react-router';
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

const ExampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.Y0M_wkxFaw2R8ZQUT1-nAd_2zKtzBs2almfUwZposoM";
const MissingUsernameToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
const BrokenToken = "test";

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
    const history = createMemoryHistory('/');
    store = createStore(rootReducer, initialState, compose(
        applyMiddleware(
          routerMiddleware(history), // TODO: need to figure out how to mock the router enough to check transitions
          manageTokenMiddleware(localStorageMock)
        )
      )
    );
  });

  it(`should call getItem on storage on ${types.CHECK_CREDS}`, () => {
    const action = actions.checkCreds();

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });

  it(`should call setItem on storage on ${types.LOGIN_REQUEST_SUCCESS}`, (done) => {
    const action = { type: types.LOGIN_REQUEST_SUCCESS, result: { id_token: ExampleToken } };

    let calls = 0;
    const unsubscribe = store.subscribe(() => {
      if (++calls === 1) return; // skip the LOGIN_REQUEST_SUCCESS action
      expect(localStorageMock.setItem.calledOnce).to.be.true;
      expect(store.getState().auth.token).to.be.equal(ExampleToken);
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



  it(`should get access token on ${types.CHECK_CREDS}`, () => {
    localStorageMock.setItem(keys.ACCESS_TOKEN, ExampleToken);
    const action = actions.checkCreds();

    store.dispatch(action);

    expect(localStorageMock.getItem.calledOnce).to.be.true;
  });

  it('should add a config and Authorization header to actions with "useToken"', () => {
    localStorageMock.setItem(keys.ACCESS_TOKEN, ExampleToken);
    const action = { type: 'TEST_REQUEST', useToken: true };

    store.dispatch({ type: types.CHECK_CREDS }); // load the token into state
    const result = store.dispatch(action);
    expect(result.config.headers.Authorization).to.be.equal(`Bearer ${ExampleToken}`);
  });

  describe(types.LOGIN_REQUEST_SUCCESS, () => {

    it(`should send ${types.LOGIN_FAILURE} when no token in response`, (done) => {
      // first populate the store with a token
      const sucessfulLogin = { type: types.LOGIN_SUCCESS, token: ExampleToken, username: 'test' };
      store.dispatch(sucessfulLogin);

      const action = { type: types.LOGIN_REQUEST_SUCCESS, result: { id_token: '' } };

      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return; // skip the LOGIN_REQUEST_SUCCESS action
        expect(store.getState().auth.token).to.be.equal('');
        expect(localStorageMock.setItem.callCount).to.equal(0);
        expect(store.getState().app.messages.length).to.equal(1);
        unsubscribe();
        done();
      });

      // then dispatch a LOGIN_REQUEST_SUCCESS with an empty token
      store.dispatch(action);
    });

    it(`should send ${types.LOGIN_FAILURE} when username not in token`, (done) => {
      // first populate the store with a token
      const sucessfulLogin = { type: types.LOGIN_SUCCESS, token: ExampleToken, username: 'test' };
      store.dispatch(sucessfulLogin);

      const action = { type: types.LOGIN_REQUEST_SUCCESS, result: { id_token: MissingUsernameToken } };

      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return; // skip the LOGIN_REQUEST_SUCCESS action
        // the authReducer sets the token to an empty string
        expect(store.getState().auth.token).to.be.equal('');
        expect(localStorageMock.setItem.callCount).to.equal(0);
        expect(store.getState().app.messages.length).to.equal(1);
        unsubscribe();
        done();
      });

      // then dispatch a LOGIN_REQUEST_SUCCESS with a token with no "username" field
      store.dispatch(action);
    });
  });

  describe(types.CHECK_CREDS, () => {

    const action = actions.checkCreds();

    it(`should send ${types.LOGIN_FAILURE} when token is broken`, (done) => {
      // first populate the store with a token
      const sucessfulLogin = { type: types.LOGIN_SUCCESS, token: BrokenToken, username: 'test' };
      store.dispatch(sucessfulLogin);

      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return; // skip the LOGIN_REQUEST_SUCCESS action
        expect(store.getState().auth.isAuthenticated).to.be.false;
        expect(localStorageMock.getItem.callCount).to.equal(0);
        expect(store.getState().app.messages.length).to.equal(1);
        unsubscribe();
        done();
      });

      // then dispatch a LOGIN_REQUEST_SUCCESS with an empty token
      store.dispatch(action);
    });

    it(`should send ${types.LOGIN_FAILURE} when username is not in token`, (done) => {
      // first populate the store with a token
      const sucessfulLogin = { type: types.LOGIN_SUCCESS, token: MissingUsernameToken, username: 'test' };
      store.dispatch(sucessfulLogin);

      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return; // don't check on the LOGIN_FAILURE action
        // the authReducer sets the isAuthenticated to false
        expect(store.getState().auth.isAuthenticated).to.be.false;
        expect(localStorageMock.setItem.callCount).to.equal(0);
        expect(store.getState().app.messages.length).to.equal(1);
        unsubscribe();
        done();
      });

      store.dispatch(action);
    });


    it(`should dispatch ${types.LOGIN_SUCCESS} with access token and username`, (done) => {
      localStorageMock.setItem(keys.ACCESS_TOKEN, ExampleToken);
      const action = actions.checkCreds();

      let calls = 0;
      const unsubscribe = store.subscribe(() => {
        if (++calls === 1) return; // skip the CHECK_CREDS action
        expect(localStorageMock.getItem.calledOnce).to.be.true;
        expect(store.getState().auth.token).to.be.equal(ExampleToken);
        expect(store.getState().auth.username).to.be.equal(decode(ExampleToken).username);
        unsubscribe();
        done();
      });

      store.dispatch(action);
    });
  });

  // it(`should push new route on ${types.LOGIN_REQUIRED}`, (done) => {
  //   const path = '/';
  //   const action =  actions.requireLogin(path);
  //   const firstPush = {
  //     type: "@@router/LOCAION_CHANGE",
  //     payload: {
  //       pathname: '/'
  //     }
  //   };
  //   store.dispatch(firstPush);

  //   const unsubscribe = store.subscribe(() => {
  //     expect(store.getState().routing.locationBeforeTransitions.pathname).to.be.equal(path);
  //     unsubscribe();
  //     done();
  //   });

  //   store.dispatch(action); // load the token into state
  // });
});
