import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middewares = [
    sagaMiddleware,
  ];

  sagaMiddleware.run(rootSaga);

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
}
