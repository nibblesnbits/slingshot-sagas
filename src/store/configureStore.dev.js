// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import manageTokenMiddleware from '../middleware/manageToken';
import manageCartMiddleware from '../middleware/manageCart';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middewares = [

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    sagaMiddleware,

    manageTokenMiddleware(),
    manageCartMiddleware(),

    routerMiddleware(browserHistory),
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middewares),
    window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
