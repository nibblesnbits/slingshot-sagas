import { takeEvery, delay  } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';
import * as actions from '../actions/app';

export function* showToast({ title, text, className, duration }) {
  const message = yield put(actions.showMessage(title, text, className));
  console.log(message);
  yield call(delay, duration);
  yield put(actions.fadeMessage(message.id));
  yield call(delay, 2500);
  yield put(actions.removeMessage(message.id));
}

export function* watchToast() {
  yield* takeEvery(types.SHOW_TOAST, showToast);
}
