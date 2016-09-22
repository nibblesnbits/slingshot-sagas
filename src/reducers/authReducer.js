import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        isFetching: false
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false
      };
    default:
      return state;
  }
}
