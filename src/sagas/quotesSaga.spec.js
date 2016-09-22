// import { put } from 'redux-saga/effects';
// import callApi from './helpers';
// import { getQuote } from './quotesSaga';
// import { expect } from 'chai';
// import * as types from '../constants/actionTypes';

// describe('quotesSaga', () => {
//   describe('getQuote', () => {
//     it('should yield QUOTE_SUCCESS on fetch success', () => {

//       const action = { endpoint: 'test', config: {} };

//       const gen = getQuote(action);

//       // first dispatch SHOW_MESSAGE
//       let next = gen.next().value;
//       expect(next.value)
//       .to.be.deep
//       .equal(callApi("", {}, [types.QUOTE_SUCCESS, types.QUOTE_FAILURE], "text"));

//       // // then wait the action-specified delay
//       // next = gen.next().value;
//       // expect(next)
//       // .to.be.deep.equal(call(delay, action.duration));

//       // // then dispatch FADE_MESSAGE
//       // next = gen.next().value;
//       // // expect(next.type)  // can't test this
//       // // .to.be.deep.equal(put({ type: types.FADE_MESSAGE }).type);

//       // // then wait the saga-specified delay
//       // next = gen.next().value;
//       // expect(next)
//       // .to.be.deep.equal(call(delay, 500));

//       // // then dispatch REMOVE_MESSAGE
//       // next = gen.next().value;
//       // // expect(next)  // can't test this, either
//       // // .to.be.deep.equal(put({ type: types.REMOVE_MESSAGE }).type);

//       // // and be done
//       // next = gen.next().value;
//       // expect(next)
//       // .to.be.undefined;

//     });
//   });
// });
