import * as types from '../constants/actionTypes';

// Uses the API middlware to get a quote
export function fetchQuote() {
  return {
    endpoint: 'random-quote',
    config: {},
    type: types.QUOTE_REQUEST
  };
}

// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
export function fetchSecretQuote() {
  return {
    endpoint: 'protected/random-quote',
    type: types.QUOTE_REQUEST
  };
}
