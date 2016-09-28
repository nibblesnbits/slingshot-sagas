import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import appReducer from './appReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  auth: authReducer,
  routing: routerReducer,
  app: appReducer,
  products: productReducer,
  form: formReducer,
  cart: cartReducer
});
