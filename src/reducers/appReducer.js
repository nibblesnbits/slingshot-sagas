import * as types from '../constants/actionTypes';
import initialState from './initialState';

function sortByOrder(a,b) {
  return a.order > b.order ? 1 : (a.order < b.order ? -1 : 0);
}

export default function authReducer(state = initialState.app, action) {
  switch (action.type) {
    case types.REMOVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages]
          .filter(m => m.id !== action.id)
          .sort(sortByOrder)
          .map((m, i) => { return { ...m, order: i }; })
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
        ].sort(sortByOrder)
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
          { ...action, order: state.messages.length }
        ]
      };
    default:
      return state;
  }
}
