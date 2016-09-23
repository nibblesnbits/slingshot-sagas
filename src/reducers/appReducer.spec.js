
import { expect } from 'chai';
import appReducer from './appReducer';
import * as actions from '../actions/app';

describe('App Reducer', () => {

  it ('should add message on showMessage()', () => {
    const initialState = {
      messages: []
    };

    const action = actions.showMessage('test', 'test', 'success');

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(1);
  });

  it ('should delete message on removeMessage()', () => {
    const initialState = {
      messages: [{
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false,
        id: 0
      }]
    };

    const action = actions.removeMessage(0);

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(0);
  });

  it ('should hide all messages on clearMesages()', () => {
    const initialState = {
      messages: [{
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false,
        id: 0
      }]
    };

    const action = actions.clearMessages();

    const newState = appReducer(initialState, action);

    expect(newState.messages.length).to.equal(0);
  });

  it ('should set hidden to "true" for a message on fadeMessage()', () => {
    const initialState = {
      messages: [{
        title: 'test',
        text: 'test',
        className: 'info',
        hidden: false,
        id: 0
      }]
    };

    const action = actions.fadeMessage(0);

    const newState = appReducer(initialState, action);

    expect(newState.messages[0].hidden).to.be.true;
    expect(newState.messages.length).to.be.equal(1);
  });
});
