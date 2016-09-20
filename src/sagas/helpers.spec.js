// import { put, call } from 'redux-saga/effects';
// import { expect } from 'chai';
// import callApi, { makeRequest } from './helpers';

// describe('saga helper', () => {
//   describe('callApi()', () => {
    // it('should yield specified SUCCESS type on request success', () => {

    //   // arrange
    //   const text = "quote";
    //   // TODO: figure out how this is actually supposed to be structured to replicate the real response.
    //   //       this is the only reason this test is failing
    //   const apiResult =Promise.resolve({
    //     response: {
    //       "text": {
    //           ok: true,
    //           "result": () => Promise.resolve(text)
    //       }
    //     }
    //   });
    //   const url = 'http://tempuri.org/json';
    //   const config = { };
    //   const types = ['SUCCESS', 'FAILURE'];
    //   const action = { type: types[0], result: text };

    //   // act
    //   const gen = callApi(url, config, types, "text");
    //   // assert
    //   let next = gen.next(apiResult);
    //   expect(next.value).to.be
    //     .deep.equal(call(makeRequest, url, config, "text"));

    //   next = gen.next();
    //   expect(next.value).to.be.deep.equal(put(action));

    //   next = gen.next();
    //   expect(next.value).to.be.undefined;
    //   expect(next.done).to.be.true;
    // });

    // it('should yield specified FAILURE type on request failure', () => {

    //   // arrange
    //   const error = {};
    //   // TODO: figure out how this is actually supposed to be structured to replicate the real response.
    //   //       this is the only reason this test is failing
    //   const apiResult = Promise.reject(error);
    //   const url = 'http://tempuri.org/json';
    //   const config = { };
    //   const types = ['SUCCESS', 'FAILURE'];
    //   const action = { type: types[0], error };

    //   // act
    //   const gen = callApi(url, config, types, "json");

    //   // assert
    //   let next = gen.next(apiResult);
    //   expect(next.value).to.be
    //     .deep.equal(call(makeRequest, url, config, "json"));

    //   next = gen.next();
    //   expect(next.value).to.be.deep.equal(put(action));

    //   next = gen.next();
    //   expect(next.value).to.be.undefined;
    //   expect(next.done).to.be.true;
    // });

    // it('should yield specified FAILURE type on non-200 return', () => {

    //   // arrange
    //   const error = {};
    //   // TODO: figure out how this is actually supposed to be structured to replicate the real response.
    //   //       this is the only reason this test is failing
    //   const apiResult = Promise.resolve({
    //     response: () => Promise.resolve({error}),
    //     result: {
    //       ok: false
    //     }
    //   });
    //   const url = 'http://tempuri.org/json';
    //   const config = { };
    //   const types = ['SUCCESS', 'FAILURE'];
    //   const action = { type: types[0], error };

    //   // act
    //   const gen = callApi(url, config, types, "json");

    //   // assert
    //   let next = gen.next(apiResult);
    //   expect(next.value).to.be
    //     .deep.equal(call(makeRequest, url, config, "json"));

    //   next = gen.next();
    //   expect(next.value).to.be.deep.equal(put(action));

    //   next = gen.next();
    //   expect(next.value).to.be.undefined;
    //   expect(next.done).to.be.true;
    // });
//   });
// });
