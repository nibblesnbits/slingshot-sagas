import { takeEvery, delay  } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as types from '../constants/actionTypes';

export function* showToast({title, text, className, duration }) {
  yield put({ type: types.SHOW_MESSAGE, title, text, className });
  yield call(delay, duration);
   // TODO: I need to know the ID here.
  yield put({ type: types.HIDE_MESSAGE, id: 0 });
}

export function* watchToast() {
  yield* takeEvery(types.SHOW_TOAST, showToast);
}
