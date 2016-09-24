import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import { mapStateToProps, Navbar } from './Navbar';

chai.use(sinonChai);

describe('<Navbar />', () => {

  let store;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);
  });

  it('should render Login when isAuthenticated is false', () => {
    const props = {
      username: 'test',
      isAuthenticated: false,
      logout: sinon.spy(),
      login: sinon.spy()
    };

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );
    const loginButton = wrapper.find('Login');

    expect(loginButton.length).to.equal(1);
  });

  it('should render Logout when isAuthenticated is true', () => {
    const props = {
      username: 'test',
      isAuthenticated: true,
      logout: sinon.spy(),
      login: sinon.spy()
    };

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );

    const logoutButton = wrapper.find('Logout');

    expect(logoutButton.length).to.equal(1);
  });

  it('should call login() on login button click', () => {
    const props = {
      username: 'test',
      isAuthenticated: false,
      logout: sinon.spy(),
      login: sinon.spy()
    };

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );

    const loginButton = wrapper.find('.login-button');
    expect(loginButton.length).to.equal(1);
    loginButton.simulate('click');

    expect(props.login.calledOnce).to.equal(true);
  });

  it('should call logout() on logout button click', () => {
    const props = {
      username: 'test',
      isAuthenticated: true,
      logout: sinon.spy(),
      login: sinon.spy()
    };

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );

    const logoutButton = wrapper.find('.logout-button');
    expect(logoutButton.length).to.equal(1);
    logoutButton.simulate('click');

    expect(props.logout.calledOnce).to.equal(true);
  });


  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const state = {
        auth: {
          isAuthenticated: true,
          username: 'test'
        }
      };

      const result = mapStateToProps(state);

      expect(result).to.deep.equal(state.auth);
    });
  });
});
