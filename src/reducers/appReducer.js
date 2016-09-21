import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState.app, action) {
  switch (action.type) {
    case types.HIDE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, action.id),
          ...state.messages.slice(action.id + 1)
        ].reverse()
      };
    case types.SHOW_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            title: action.title,
            className: action.className,
            text: action.text,
            hidden: false
          }
        ].reverse()
      };
    default:
      return state;
  }
}
