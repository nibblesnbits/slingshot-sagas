import { put, call } from 'redux-saga/effects';
import { expect } from 'chai';
import callApi, { makeRequest } from './helpers';

describe('saga helper', () => {
  describe('callApi()', () => {
    it('should yield specified SUCCESS type on request success', () => {

      // arrange
      const text = "test";
      const responseType = "text";
      const url = 'http://tempuri.org/json';
      const config = { };
      const types = ['SUCCESS', 'FAILURE'];
      const sucessAction = { type: types[0], result: text };

      const gen = callApi(url, config, types, responseType);

      // act & assert
      let next = gen.next().value;
      expect(next).to.deep.equal(call(makeRequest, url, config, responseType));

      next = gen.next(text).value;
      expect(next).to.deep.equal(put(sucessAction));

      next = gen.next().value;
      expect(next).to.equal(text);

      next = gen.next();
      expect(next.value).to.be.undefined;
      expect(next.done).to.be.true;
    });

    it('should yield specified FAILURE type on request failure', () => {

      // arrange
      const error = new Error('test');
      const responseType = "text";
      const url = 'http://tempuri.org/json';
      const config = { };
      const types = ['SUCCESS', 'FAILURE'];
      const failureAction = { type: types[1], error: { message: error.message } };

      const gen = callApi(url, config, types, responseType);

      // act & assert
      let next = gen.next().value;
      expect(next).to.deep.equal(call(makeRequest, url, config, responseType));

      next = gen.throw(error).value;
      expect(next).to.deep.equal(put(failureAction));
    });
  });
});
