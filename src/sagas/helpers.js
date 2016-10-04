import { put, call } from 'redux-saga/effects';

export function makeRequest(request, returnType) {
  return request().then(response =>
    response[returnType]()
      .then(result => ({ result, response }))
  ).then(({ result, response }) => {
    if (!response.ok) {
      throw result;
    }
    return result;
  });
}

export default function* callApi(request, statusTypes, returnType = "json") {
  const [SUCCESS, FAILURE] = statusTypes;
  try {
    const result = yield call(makeRequest, request, returnType);
    yield put({ type: SUCCESS, result });
    return result;
  } catch (error) {
    yield put({ type: FAILURE, error: { message: error.message } });
    throw error;
  }
}
