import { takeEvery, delay  } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/appActions';

export const FADE_DELAY = 2500;

export function* showToast({ title, text, className, duration }) {
  const message = yield put(actions.showMessage(title, text, className));
  yield call(delay, duration);
  yield put(actions.fadeMessage(message.id));
  yield call(delay, FADE_DELAY);
  yield put(actions.removeMessage(message.id));
}

export function* watchToast() {
  yield* takeEvery(types.SHOW_TOAST, showToast);
}
