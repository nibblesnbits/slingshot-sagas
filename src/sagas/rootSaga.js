import { watchLogin, watchLogout } from './authSaga';
import { watchGetQuotes } from './quotesSaga';
import { watchToast } from './toastSaga';

export default function* rootSaga() {
  yield [
    watchGetQuotes(),
    watchLogin(),
    watchLogout(), // TODO: look into removing this since the middleware and reducers might take care of it
    watchToast(),
  ];
}
