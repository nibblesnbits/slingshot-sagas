import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App'; // eslint-disable-line import/no-named-as-default
import HomePage from './containers/HomePage'; // eslint-disable-line import/no-named-as-default
import ProfilePage from './containers/ProfilePage'; // eslint-disable-line import/no-named-as-default
import ProductsPage from './containers/ProductsPage'; // eslint-disable-line import/no-named-as-default
import ProductAdminPage from './containers/ProductAdminPage'; // eslint-disable-line import/no-named-as-default
import CartPage from './containers/CartPage'; // eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="/profile" component={ProfilePage}/>
    <Route path="/products" component={ProductsPage}/>
    <Route path="/products/admin" component={ProductAdminPage}/>
    <Route path="/cart" component={CartPage}/>
  </Route>
);
