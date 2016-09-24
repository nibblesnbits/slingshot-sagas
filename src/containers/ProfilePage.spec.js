import React from 'react';
import { mount } from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mapStateToProps, ProfilePage } from './ProfilePage';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';

chai.use(sinonChai);

describe('<ProfilePage />', () => {

  it('should contain RouteGuard', () => {
    const props = {
      username: 'test',
      token: 'test',
      logout: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
          <ProfilePage {...props} />
      </Provider>
    );

    expect(wrapper.find('.route-guard').length).to.equal(1);
  });

  it('should call logout() on logout button click', () => {
    const props = {
      username: 'test',
      token: 'test',
      logout: sinon.spy()
    };
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
          <ProfilePage {...props} />
      </Provider>
    );

    const logoutButton = wrapper.find('.logout-button');
    expect(logoutButton.length).to.equal(1);

    logoutButton.simulate('click');

    expect(props.logout.calledOnce).to.be.true;
  });

  describe('mapStateToProps', () => {
    it('should return valid props', () => {
      const state = {
        auth: {
          username: 'test',
          token: 'test'
        }
      };

      const result = mapStateToProps(state);

      expect(result).to.deep.equal(state.auth);
    });
  });
});
