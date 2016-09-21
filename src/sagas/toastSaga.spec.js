import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { showToast } from './toastSaga';
import { assert } from 'chai';
import * as types from '../constants/actionTypes';

describe('toastSaga', () => {
  describe('showToast', () => {
    it('should yield SHOW_MESSAGE, delay, then HIDE_MESSAGE', () => {
      const action = {text: 'test', title: 'test', className: 'test', duration: 500};

      const gen = showToast(action);

      assert.deepEqual(
        gen.next().value.type,
        put({ type: types.SHOW_MESSAGE }).type,
        'first message should equal SHOW_MESSAGE'
      );

      assert.deepEqual(
        gen.next().value,
        call(delay, action.duration),
        'delay should be called'
      );

      assert.deepEqual(
        gen.next().value,
        put({ type: types.REMOVE_MESSAGE, id: 0 }),
        'third message should be HIDE_MESSAGE'
      );
    });
  });
});
