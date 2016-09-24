import { call, put } from 'redux-saga/effects';
import callApi from './helpers';
import { login } from './authSaga';
import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';

describe('authSaga', () => {
  describe('login', () => {
    it('should yield LOGIN_REQUEST_SUCCESS on fetch success', () => {

      const creds = { username: 'test', password: 'test' };
      const gen = login({ username: 'test', password: 'test' });
      const config = {
          method: 'POST',
          headers: { 'Content-Type':'application/x-www-form-urlencoded' },
          body: `grant_type=password&username=${creds.username}&password=${creds.password}&client_id=Redux`
        };
        const url = "http://localhost:4001/sessions/create";

      // just call callApi()
      let next = gen.next().value;
      expect(next)
      .to.deep.equal(call(callApi, url, config, [types.LOGIN_REQUEST_SUCCESS, types.LOGIN_REQUEST_FAILURE]));

      // and be done
      next = gen.next();
      expect(next.value).to.be.undefined;
      expect(next.done).to.be.true;
    });

    it('should yield LOGIN_REQUEST_FAILURE on fetch failure', () => {

      const error = { message: 'test' };
      const action = appActions.showMessage('Login Error:', error.message, 'danger');
      const creds = { username: 'test', password: 'test' };
      const gen = login({ username: 'test', password: 'test' });
      const config = {
          method: 'POST',
          headers: { 'Content-Type':'application/x-www-form-urlencoded' },
          body: `grant_type=password&username=${creds.username}&password=${creds.password}&client_id=Redux`
        };
        const url = "http://localhost:4001/sessions/create";

      // just call callApi()
      let next = gen.next().value;
      expect(next)
      .to.deep.equal(call(callApi, url, config, [types.LOGIN_REQUEST_SUCCESS, types.LOGIN_REQUEST_FAILURE]));

      // throw
      next = gen.throw(error).value;
      expect(next.type)
      .to.deep.equal(put(action).type);
    });
  });
});
