import { takeEvery, delay  } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';

export function* showToast({title, message, className, duration }) {
  yield put({ type: types.SHOW_MESSAGE, title, message, className });
  yield call(delay, duration);
  yield put({ type: types.HIDE_MESSAGE });
}

export function* watchToast() {
  yield* takeEvery(types.SHOW_TOAST, showToast);
}
