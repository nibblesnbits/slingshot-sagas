
import { expect } from 'chai';
import appReducer from './appReducer';
import * as actions from '../actions/appActions';

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

  it ('messages remain in original order on fadeMessage()', () => {
    const initialState = {
      messages: [{
        title: 'test1',
        text: 'test1',
        className: 'test1',
        hidden: false,
        id: 'test1',
        order: 0
      }, {
        title: 'test2',
        text: 'test2',
        className: 'test2',
        hidden: false,
        id: 'test2',
        order: 1
      }]
    };

    const action = actions.fadeMessage('test1');

    const newState = appReducer(initialState, action);
    expect(newState.messages[0].order).to.equal(0);
  });

  it ('messages remain in original order on showMessage()', () => {
    const initialState = {
      messages: [{
        title: 'test0',
        text: 'test0',
        className: 'test0',
        hidden: true,
        id: 'test0',
        order: 0
      }, {
        title: 'test2',
        text: 'test2',
        className: 'test2',
        hidden: true,
        id: 'test2',
        order: 2
      }]
    };

    const action = actions.showMessage('test1', 'test1', 'test1');

    const newState = appReducer(initialState, action);
    expect(newState.messages[2].order).to.equal(2);
  });

  it ('messages remain in original order on removeMessage()', () => {
    const initialState = {
      messages: [{
        title: 'test0',
        text: 'test0',
        className: 'test0',
        hidden: false,
        id: 'test0',
        order: 0
      }, {
        title: 'test1',
        text: 'test1',
        className: 'test1',
        hidden: true,
        id: 'test1',
        order: 1
      }, {
        title: 'test2',
        text: 'test2',
        className: 'test2',
        hidden: true,
        id: 'test2',
        order: 2
      }]
    };

    const action = actions.removeMessage('test1');

    const newState = appReducer(initialState, action);
    expect(newState.messages[1].order).to.equal(1);
  });
});
