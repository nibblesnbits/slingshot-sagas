
import { expect } from 'chai';
import appReducer from './appReducer';
import * as actions from '../actions/app';

describe('App Reducer', () => {

  it ('should show message on SHOW_MESSAGE', () => {
    const initialState = {
      message: {
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: true
      }
    };

    const action = actions.showMessage('test', 'test', 'success');

    const newState = appReducer(initialState, action);

    expect(newState.message.text).to.equal('test');
    expect(newState.message.title).to.equal('test');
    expect(newState.message.hidden).to.equal(false);
  });

  it ('should hide message on HIDE_MESSAGE', () => {
    const initialState = {
      message: {
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false
      }
    };

    const action = actions.hideMessage('test', 'success');

    const newState = appReducer(initialState, action);

    expect(newState.message.hidden).to.equal(true);
  });
});
