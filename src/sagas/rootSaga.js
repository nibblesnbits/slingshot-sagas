import { watchLogin } from './authSaga';
import { watchToast } from './toastSaga';
import {
  watchCreateProductRequest,
  watchReadProductsRequest,
  watchReadProductRequest,
  watchUpdateProductRequest,
  watchDeleteProductRequest
} from './productSaga';

export default function* rootSaga() {
  yield [
    watchLogin(),
    watchToast(),
    watchCreateProductRequest(),
    watchReadProductsRequest(),
    watchReadProductRequest(),
    watchUpdateProductRequest(),
    watchDeleteProductRequest()
  ];
}
