// import React from 'react';
// import { mount } from 'enzyme';
// import chai, {expect} from 'chai';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import { HomePage } from './HomePage';
// import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import initialState from '../reducers/initialState';
// import { Provider } from 'react-redux';

// chai.use(sinonChai);

// describe('<HomePage />', () => {

//   it('should call fetchQuote() on mount', () => {
//     const props = {
//       quote: 'test',
//       isAuthenticated: false,
//       isSecretQuote: false,
//       isFetching: false,
//       fetchQuote: sinon.spy(),
//       fetchSecretQuote: sinon.spy()
//     };
//     const store = createStore(rootReducer, initialState);

//     mount(
//       <Provider store={store}>
//           <HomePage {...props} />
//       </Provider>
//     );

//     expect(props.fetchQuote.calledOnce).to.equal(true);
//   });
// });
