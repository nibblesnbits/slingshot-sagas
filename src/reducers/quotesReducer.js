import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function quotes(state = initialState.quotes, action) {
  switch (action.type) {
    case types.QUOTE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.QUOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        quote: action.result,
        authenticated: action.authenticated || false
      };
    case types.QUOTE_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
}
