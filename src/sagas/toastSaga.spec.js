import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { showToast } from './toastSaga';
import { expect } from 'chai';
import * as types from '../constants/actionTypes';

describe('toastSaga', () => {
  describe('showToast', () => {
    it('should yield SHOW_MESSAGE, delay, FADE_MESSAGE, then REMOVE_MESSAGE', function*() {

      const action = { text: 'test', title: 'test', className: 'test', duration: 500 };

      const gen = yield showToast(action);

      // first dispatch SHOW_MESSAGE
      let next = gen.next().value;
      expect(next.value)
      .to.deep.equal(put({ type: types.SHOW_MESSAGE }).type);

      // then wait the action-specified delay
      next = gen.next().value;
      expect(next).to.deep.equal(call(delay, action.duration));

      // then dispatch FADE_MESSAGE
      next = gen.next().value;
      expect(next).to.deep.equal(put({ type: types.FADE_MESSAGE }).type);

      // then wait the saga-specified delay
      next = gen.next().value;
      expect(next).to.deep.equal(call(delay, 500));

      // then dispatch REMOVE_MESSAGE
      next = gen.next().value;
      expect(next).to.deep.equal(put({ type: types.REMOVE_MESSAGE }).type);

      // and be done
      next = gen.next().value;
      expect(next)
      .to.be.undefined;

    });
  });
});
