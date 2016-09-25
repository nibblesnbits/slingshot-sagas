import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        product: action.result,
        isFetching: false
      };
    case types.PRODUCT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
