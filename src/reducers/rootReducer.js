import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import quotesReducer from './quotesReducer';
import appReducer from './appReducer';

export default combineReducers({
  auth: authReducer,
  quotes: quotesReducer,
  routing: routerReducer,
  app: appReducer
});
