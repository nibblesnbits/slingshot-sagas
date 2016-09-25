import { put, call } from 'redux-saga/effects';

export function makeRequest(url, config, returnType) {

  return fetch(url, config)
  .then(response => {
      if (!response.ok) {
        // This part is only because the auth server
        // throws oddly shaped, unpredictable errors.
        // in a normal scenario, this would simply
        // parse the json error response.
        return response.text().then(result => {
          return Promise.reject({ message: result });
        });
      }
      return response[returnType]();
    });
}

export default function* callApi(url, config, statusTypes, returnType = "json") {
  const [ SUCCESS, FAILURE ] = statusTypes;
  try {
    const result = yield call(makeRequest, url, config, returnType);
    // this authenticated bit is hacky
    const authenticated = config.headers ? (config.headers.Authorization) : false;
    yield put({ type: SUCCESS, result, authenticated: authenticated });
    return result;
  } catch (error) {
    yield put({type: FAILURE, error: error.message });
    throw error;
  }
}
