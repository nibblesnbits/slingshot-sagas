import * as types from '../constants/actionTypes';

export function showMessage(title, text, className) {
  return {
    type: types.SHOW_MESSAGE,
    title,
    text,
    className
  };
}

export function showToast(title, text, className, duration = 2000) {
  return {
    type: types.SHOW_TOAST,
    title,
    text,
    className,
    duration
  };
}

export function hideMessage(id) {
  return {
    type: types.HIDE_MESSAGE,
    id: id
  };
}
