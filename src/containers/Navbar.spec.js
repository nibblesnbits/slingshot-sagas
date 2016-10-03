import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import { Provider } from 'react-redux';
import Navbar from './Navbar'; // eslint-disable-line import/no-named-as-default

chai.use(sinonChai);

const ExampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.Y0M_wkxFaw2R8ZQUT1-nAd_2zKtzBs2almfUwZposoM";

describe('<Navbar />', () => {

  describe('when user is logged out', () => {

    let store;
    beforeEach(() => {
      store = createStore(rootReducer, {
        auth: {
          token: '',
          username: 'user',
          roles: ['user'],
          isFetching: false
        }
      });
    });

    it('should render Login component', () => {
      const props = {
        login: sinon.spy(),
        logout: sinon.spy()
      };

      const wrapper = mount(
        <Provider store={store}>
            <Navbar {...props} />
        </Provider>
      );
      const loginComponent = wrapper.find('Login');

      expect(loginComponent.length).to.equal(1);
    });
  });

  describe('when user is logged in', () => {

    let store;
    beforeEach(() => {
      store = createStore(rootReducer, {
        auth: {
          token: ExampleToken,
          username: 'user',
          roles: ['user'],
          isFetching: false
        }
      });
    });

    it('should render Logout', () => {
      const props = {
        login: sinon.spy(),
        logout: sinon.spy()
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
});
