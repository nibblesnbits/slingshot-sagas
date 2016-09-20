import * as types from '../constants/actionTypes';

export function showMessage(title, message, className) {
  return {
    type: types.SHOW_MESSAGE,
    title,
    message,
    className
  };
}

export function showToast(title, message, className, duration = 2000) {
  return {
    type: types.SHOW_TOAST,
    title,
    message,
    className,
    duration
  };
}

export function hideMessage() {
  return {
    type: types.HIDE_MESSAGE
  };
}
