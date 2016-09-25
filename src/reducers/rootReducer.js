import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import appReducer from './appReducer';
import productReducer from './productReducer';

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  app: appReducer,
  products: productReducer
});
