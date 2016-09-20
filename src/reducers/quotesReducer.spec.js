
import { expect } from 'chai';
import quotesReducer from './quotesReducer';
import * as actions from '../actions/quotes';

describe('App Reducer', () => {

  it ('should return isFetching on LOGIN_REQUEST', () => {
    const initialState = {
      quotes: {
        isFetching: false
      },
    };

    const action = actions.fetchQuote();

    const newState = quotesReducer(initialState, action);

    expect(newState.isFetching).to.be.true;
  });
});
