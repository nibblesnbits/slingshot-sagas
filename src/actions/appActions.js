import * as types from '../constants/actionTypes';

function generateId() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4);
}

export function showMessage(title, text, className) {
  return {
    type: types.SHOW_MESSAGE,
    title,
    text,
    className,
    hidden: false,
    id: generateId()
  };
}

export function showToast(title, text, className, duration = 2000) {
  return {
    type: types.SHOW_TOAST,
    title,
    text,
    className,
    duration,
    hidden: false,
    id: generateId()
  };
}

export function removeMessage(id) {
  return {
    type: types.REMOVE_MESSAGE,
    id: id
  };
}

export function fadeMessage(id) {
  return {
    type: types.FADE_MESSAGE,
    id: id
  };
}

export function clearMessages() {
  return {
    type: types.CLEAR_MESSAGES
  };
}
