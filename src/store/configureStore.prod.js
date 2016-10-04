import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';
import { routerMiddleware } from 'react-router-redux';
import manageTokenMiddleware from '../middleware/manageToken';
import { browserHistory } from 'react-router';
import manageCartMiddleware from '../middleware/manageCart';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middewares = [
    sagaMiddleware,
    manageTokenMiddleware(),
    manageCartMiddleware(),
    routerMiddleware(browserHistory)
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
