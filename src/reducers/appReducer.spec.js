
import { expect } from 'chai';
import appReducer from './appReducer';
import * as actions from '../actions/app';

describe('App Reducer', () => {

  it ('should add message on SHOW_MESSAGE', () => {
    const initialState = {
      messages: []
    };

    const action = actions.showMessage('test', 'test', 'success');

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(1);
  });

  it ('should hide message on REMOVE_MESSAGE', () => {
    const initialState = {
      messages: [{
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false
      }]
    };

    const action = actions.removeMessage(0);

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(0);
  });

  it ('should hide all messages on CLEAR_MESSAGES', () => {
    const initialState = {
      messages: [{
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false
      }]
    };

    const action = actions.clearMesages();

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(0);
  });
});
