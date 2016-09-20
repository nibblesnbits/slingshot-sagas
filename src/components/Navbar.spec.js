// import React from 'react';
// import { mount } from 'enzyme';
// import chai, {expect} from 'chai';
// import sinon from 'sinon';
// import sinonChai from 'sinon-chai';
// import { createStore } from 'redux';
// import rootReducer from '../reducers/rootReducer';
// import initialState from '../reducers/initialState';
// import { Provider } from 'react-redux';
// import { Navbar } from './Navbar';

// chai.use(sinonChai);

// describe('<Navbar />', () => {

//   let store;

//   beforeEach(() => {
//     store = createStore(rootReducer, initialState);
//   });

//   it('should render Login when isAuthenticated is false', () => {
//     const props = {
//       isAuthenticated: false,
//       logout: sinon.spy(),
//       login: sinon.spy(),
//       hideMessage: sinon.spy()
//     };

//     const wrapper = mount(
//       <Provider store={store}>
//           <Navbar {...props} />
//       </Provider>
//     );
//     const loginButton = wrapper.find('Login');

//     expect(loginButton.length).to.equal(1);
//   });

//   it('should render Logout when isAuthenticated is true', () => {
//     const props = {
//       isAuthenticated: true,
//       logout: sinon.spy(),
//       login: sinon.spy(),
//       hideMessage: sinon.spy()
//     };

//     const wrapper = mount(
//       <Provider store={store}>
//           <Navbar {...props} />
//       </Provider>
//     );

//     const loginButton = wrapper.find('Logout');

//     expect(loginButton.length).to.equal(1);
//   });

//   it('should call login() on button click', () => {
//     const props = {
//       isAuthenticated: false,
//       logout: sinon.spy(),
//       login: sinon.spy(),
//       hideMessage: sinon.spy()
//     };

//     const wrapper = mount(
//       <Provider store={store}>
//           <Navbar {...props} />
//       </Provider>
//     );

//     const loginButton = wrapper.find('button');

//     expect(loginButton.length).to.equal(1);
//     loginButton.simulate('click');

//     expect(props.login.calledOnce).to.equal(true);
//   });

//   it('should call logout() on button click', () => {
//     const props = {
//       isAuthenticated: true,
//       logout: sinon.spy(),
//       login: sinon.spy(),
//       hideMessage: sinon.spy()
//     };

//     const wrapper = mount(
//       <Provider store={store}>
//           <Navbar {...props} />
//       </Provider>
//     );

//     const loginButton = wrapper.find('button');

//     expect(loginButton.length).to.equal(1);
//     loginButton.simulate('click');

//     expect(props.logout.calledOnce).to.equal(true);
//   });
// });
