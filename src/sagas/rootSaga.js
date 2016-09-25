import { watchLogin } from './authSaga';
import { watchToast } from './toastSaga';

export default function* rootSaga() {
  yield [
    watchLogin(),
    watchToast(),
  ];
}
