import * as types from '../constants/actionTypes';

export function fetchQuote() {
  return {
    endpoint: 'random-quote',
    config: {},
    type: types.QUOTE_REQUEST
  };
}

export function fetchSecretQuote() {
  return {
    endpoint: 'protected/random-quote',
    type: types.QUOTE_REQUEST
  };
}
