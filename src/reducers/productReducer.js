import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.UPDATE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
    case types.CREATE_PRODUCT_REQUEST:
    case types.READ_PRODUCT_REQUEST:
    case types.READ_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.PRODUCTS_REQUEST_SUCCESS:
      return {
        ...state,
        list: action.result,
        isFetching: false
      };
    case types.PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        list: [ ...state.list, action.result ],
        isFetching: false
      };
    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.filter(p => p.id !== action.result.id),
          action.result
        ],
        isFetching: false
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [ ...state.list, action.result ],
        isFetching: false
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [ ...state.list.filter(p => p.id !== action.result.id) ],
        isFetching: false
      };
    case types.PRODUCT_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case types.MANAGE_EDIT:
      return {
        ...state,
        editing: {
          ...state.editing,
          ...action.editing
         }
      };
    default:
      return state;
  }
}
