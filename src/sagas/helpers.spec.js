import { put, call } from 'redux-saga/effects';
import { expect } from 'chai';
import callApi, { makeRequest } from './helpers';

describe('saga helper', () => {
  describe('callApi()', () => {

    it('should yield specified SUCCESS type on request success', () => {

      // arrange
      const fetch = () => Promise.resolve();
      const text = "test";
      const responseType = "text";
      const types = ['SUCCESS', 'FAILURE'];
      const sucessAction = { type: types[0], result: text };

      const gen = callApi(fetch, types, responseType);

      // act & assert
      let next = gen.next().value;
      expect(next).to.deep.equal(call(makeRequest, fetch, responseType));

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
      const fetch = () => Promise.reject();
      const responseType = "text";
      const types = ['SUCCESS', 'FAILURE'];
      const failureAction = { type: types[1], error: { message: error.message } };

      const gen = callApi(fetch, types, responseType);

      // act & assert
      let next = gen.next().value;
      expect(next).to.deep.equal(call(makeRequest, fetch, responseType));

      next = gen.throw(error).value;
      expect(next).to.deep.equal(put(failureAction));
    });

    describe('makeRequest', () => {

      it('should resolve a promise with the specfied result', (done) => {

        // arrange
        const response = {};
        const returnType = "json";
        const fetch = () => Promise.resolve({
          [returnType]: () => Promise.resolve(response),
          ok: true
        });

        makeRequest(fetch, returnType).then(result => {
          expect(result).to.equal(response);
          done();
        });
      });

      it('should reject a promise with the specfied error', (done) => {

        // arrange
        const error = new Error('test');
        const returnType = "json";
        const fetch = () => Promise.reject(error);


        makeRequest(fetch, returnType).catch(err => {
          expect(err).to.equal(error);
          done();
        });
      });

      it('should reject a promise with the specfied error when "ok" is false', (done) => {

        // arrange
        const error = new Error('test');
        const returnType = "json";
        const fetch = () => Promise.resolve({
          [returnType]: () => Promise.resolve(error),
          ok: false
        });


        makeRequest(fetch, returnType).catch(err => {
          expect(err).to.equal(error);
          done();
        });
      });

      it('should reject a promise with the specfied error when body parse fails', (done) => {

        // arrange
        const error = new Error('test');
        const returnType = "json";
        const fetch = () => Promise.resolve({
          [returnType]: () => Promise.reject(error),
          ok: false
        });


        makeRequest(fetch, returnType).catch(err => {
          expect(err).to.equal(error);
          done();
        });
      });
    });
  });
});
