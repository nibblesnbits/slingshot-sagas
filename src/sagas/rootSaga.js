import { watchLogin } from './authSaga';
import { watchGetQuotes } from './quotesSaga';
import { watchToast } from './toastSaga';

export default function* rootSaga() {
  yield [
    watchGetQuotes(),
    watchLogin(),
    watchToast(),
  ];
}
