import { watchLogin } from './authSaga';
import { watchToast } from './toastSaga';
import { watchProductRequest } from './productSaga';

export default function* rootSaga() {
  yield [
    watchLogin(),
    watchToast(),
    watchProductRequest()
  ];
}
