import { expect } from 'chai';
import authReducer from './authReducer';
import * as actions from '../actions/authActions';
import * as types from '../constants/actionTypes';

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

  it ('should set isFetching to false on login failure', () => {
    const initialState = {
      auth: {
        isFetching: true
      },
    };

    const action = {
      type: types.LOGIN_REQUEST_FAILURE,
      error: {}
    };

    const newState = authReducer(initialState, action);

    expect(newState.isFetching).to.equal(false);
  });
});
