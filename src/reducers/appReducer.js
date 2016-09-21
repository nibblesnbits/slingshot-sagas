import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.app, action) {
  switch (action.type) {
    case types.REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
      };
    case types.FADE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.filter(m => m.id !== action.id),
          {
            ...state.messages.filter(m => m.id === action.id)[0],
            hidden: true
          }
        ]
      };
    case types.CLEAR_MESSAGES:
      return {
        ...state,
        messages: []
      };
    case types.SHOW_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { ...action }
        ]
      };
    default:
      return state;
  }
}
