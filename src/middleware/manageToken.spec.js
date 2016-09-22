// import React from 'react';
// import { createStore, compose, applyMiddleware } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import chai, { expect } from 'chai';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import initialState from '../reducers/initialState';
// import manageTokenMiddleware from './manageToken';

// chai.use(sinonChai);

// describe('manageTokenMiddleware', () => {
//   it('should add a config and header to requests with "useToken"', () => {
//     const store = createStore(rootReducer, initialState, compose(
//         applyMiddleware([manageTokenMiddleware])
//       )
//     );

//     const action = { type: 'TEST_REQUEST', useToken: true };

//     store.dispatch(action);
//     // TODO: Until I can mock localStorage, this is useless since it will just be undefined
//   });
// });


