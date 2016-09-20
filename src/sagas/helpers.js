
import { put, call } from 'redux-saga/effects';

export function makeRequest(url, config, returnType) {
  return fetch(url, config)
    .then(response =>
      response[returnType]()
      .then(result => ({ result, response }))
    ).then(({ result, response }) => {
      if (!response.ok) {
        return Promise.reject(result);
      }
      return result;
    });
}

export default function* callApi(url, config, statusTypes, returnType = "json") {
  const [ SUCCESS, FAILURE ] = statusTypes;
  try {
    const result = yield call(makeRequest, url, config, returnType);
    // TODO: the authenticated property here is hacky; needs cleanup
    yield put({ type: SUCCESS, result, authenticated: typeof((config.headers || {}).Authorization) !== "undefined" });
    return result;
  } catch (error) {
    yield put({type: FAILURE, error });
    throw error;
  }
}
