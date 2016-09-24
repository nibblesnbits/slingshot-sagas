import { call, put } from 'redux-saga/effects';
import callApi from './helpers';
import { getQuote } from './quotesSaga';
import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as appActions from '../actions/app';
import url from 'url';

const BASE_URL = 'http://localhost:4001/api/';

describe('quotesSaga', () => {
  describe('getQuote()', () => {
    it('should yield QUOTE_SUCCESS on fetch success', () => {

      const args = { endpoint: 'test', config: {} };
      const uri = url.resolve(BASE_URL, args.endpoint);
      const gen = getQuote(args);

      // just call callApi()
      let next = gen.next().value;
      expect(next)
      .to.deep.equal(call(callApi, uri, args.config, [types.QUOTE_SUCCESS, types.QUOTE_FAILURE], "text"));

      // and be done
      next = gen.next();
      expect(next.value).to.be.undefined;
      expect(next.done).to.be.true;
    });

    it('should yield QUOTE_FAILURE on fetch failure', () => {

      const args = { endpoint: 'test', config: {} };
      const error = { message: 'test' };
      const action = appActions.showMessage('Login Error:', error.message, 'danger');
      const uri = url.resolve(BASE_URL, args.endpoint);
      const gen = getQuote(args);

      // just call callApi()
      let next = gen.next().value;
      expect(next)
      .to.deep.equal(call(callApi, uri, args.config, [types.QUOTE_SUCCESS, types.QUOTE_FAILURE], "text"));

      // throw
      next = gen.throw(error).value;
      expect(next.type)
      .to.deep.equal(put(action).type);
    });
  });
});
