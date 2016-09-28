import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        username: action.username,
        roles: action.roles || []
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        token: ''
      };
    case types.LOGIN_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        token: '',
        isFetching: false
      };
    default:
      return state;
  }
}
