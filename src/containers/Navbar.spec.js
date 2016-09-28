import React from 'react';
import { mount } from 'enzyme';
import {expect} from 'chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';
import Navbar from './Navbar'; // eslint-disable-line import/no-named-as-default

const ExampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.Y0M_wkxFaw2R8ZQUT1-nAd_2zKtzBs2almfUwZposoM";

describe('<Navbar />', () => {

  let store;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);
  });

  it('should render Login when isAuthenticated is false', () => {
    const props = {
      login: () => null,
      logout: () => null
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
      login: () => null,
      logout: () => null
    };

    store.dispatch({ type: "LOGIN_SUCCESS", token: ExampleToken, username: 'test', roles: [] });

    const wrapper = mount(
      <Provider store={store}>
          <Navbar {...props} />
      </Provider>
    );

    const logoutButton = wrapper.find('Logout');

    expect(logoutButton.length).to.equal(1);
  });
});
