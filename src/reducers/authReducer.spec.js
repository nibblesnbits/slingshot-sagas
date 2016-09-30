import { expect } from 'chai';
import authReducer from './authReducer';
import * as actions from '../actions/authActions';

describe('Auth Reducer', () => {

  it ('should return isFetching on login()', () => {
    const initialState = {
      auth: {
        isFetching: false
      },
    };

    const action = actions.login({username: 'test', password: 'test'});

    const newState = authReducer(initialState, action);

    expect(newState.isFetching).to.be.true;
  });
});
