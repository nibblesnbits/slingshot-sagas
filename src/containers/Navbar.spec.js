import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import { Navbar } from './Navbar';

chai.use(sinonChai);

describe('<Navbar />', () => {

  let store;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);
  });

  it('should render Login when isAuthenticated is false', () => {
    const props = {
      auth: {
        token: '',
        username: 'test',
        roles: []
      },
      logout: sinon.spy(),
      login: sinon.spy(),
      cart: {
        items: []
      }
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
      isAuthenticated: true,
      username: 'test',
      isAdmin: true,
      cartCount: 1,
      login: () => null,
      logout: () => null
    };

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );

    const logoutButton = wrapper.find('Logout');

    expect(logoutButton.length).to.equal(1);
  });
});
