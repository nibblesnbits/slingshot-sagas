import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { ProfilePage } from './ProfilePage';
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';
import { Provider } from 'react-redux';

describe('<ProfilePage />', () => {

  it('should contain RouteGuard', () => {
    const props = {
      username: 'test',
      token: 'test',
      logout: () => null
    };
    const store = createStore(rootReducer, initialState);

    const wrapper = mount(
      <Provider store={store}>
          <ProfilePage {...props} />
      </Provider>
    );

    expect(wrapper.find('.route-guard').length).to.equal(1);
  });
});
