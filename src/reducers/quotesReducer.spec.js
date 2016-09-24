
import { expect } from 'chai';
import quotesReducer from './quotesReducer';
import * as actions from '../actions/quotes';
import * as types from '../constants/actionTypes';

describe('App Reducer', () => {

  it ('should return isFetching on fetchQuote()', () => {
    const initialState = {
      quotes: {
        isFetching: false
      }
    };

    const action = actions.fetchQuote();

    const newState = quotesReducer(initialState, action);

    expect(newState.isFetching).to.be.true;
  });

  it ('should return isFetching on fetchSecretQuote()', () => {
    const initialState = {
      quotes: {
        isFetching: false
      }
    };

    const action = actions.fetchSecretQuote();

    const newState = quotesReducer(initialState, action);

    expect(newState.isFetching).to.be.true;
  });

  it ('should return result on QUOTE_SUCCESS', () => {
    const initialState = {
      quotes: {
        isFetching: false
      },
    };

    const action = { type: types.QUOTE_SUCCESS, result: "quote this!" };

    const newState = quotesReducer(initialState, action);

    expect(newState.quote).to.equal(action.result);
  });

  it ('should return error on QUOTE_FAILURE', () => {
    const initialState = {
      quotes: {
        isFetching: false
      },
    };

    const action = { type: types.QUOTE_FAILURE, error: { message: '3rr0r!'} };

    const newState = quotesReducer(initialState, action);

    expect(newState.error).to.equal(action.error);
  });
});
