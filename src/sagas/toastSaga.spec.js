import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { showToast, FADE_DELAY } from './toastSaga';
import { expect } from 'chai';
import * as types from '../constants/actionTypes';

describe('toastSaga', () => {
  describe('showToast', () => {
    it('should yield SHOW_MESSAGE, delay, FADE_MESSAGE, then REMOVE_MESSAGE', () => {

      const action = { text: 'test', title: 'test', className: 'test', duration: 500 };
      const message = { id: 'test' };

      const gen = showToast(action);

      // first dispatch SHOW_MESSAGE
      let next = gen.next(message).value;
      expect(next.type)
      .to.deep.equal(put({ type: types.SHOW_MESSAGE }).type);

      // then wait the action-specified delay
      next = gen.next(message).value;
      expect(next).to.deep.equal(call(delay, action.duration));

      // then dispatch FADE_MESSAGE
      next = gen.next().value;
      expect(next.type).to.deep.equal(put({ type: types.FADE_MESSAGE, id: message.id }).type);

      // then wait the saga-specified delay
      next = gen.next().value;
      expect(next).to.deep.equal(call(delay, FADE_DELAY));

      // then dispatch REMOVE_MESSAGE
      next = gen.next().value;
      expect(next.type).to.deep.equal(put({ type: types.REMOVE_MESSAGE }).type);

      // and be done
      next = gen.next();
      expect(next.value).to.be.undefined;
      expect(next.done).to.be.true;
    });
  });
});
