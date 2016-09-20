import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.app.message, action) {
  switch (action.type) {
    case types.HIDE_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          hidden: true
        }
      };
    case types.SHOW_MESSAGE:
      return {
        ...state,
        message: {
          title: action.title,
          text: action.message,
          className: action.className || 'info',
          hidden: false
        }
      };
    default:
      return state;
  }
}
