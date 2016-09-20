import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App'; // eslint-disable-line import/no-named-as-default
import HomePage from './containers/HomePage'; // eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
  </Route>
);
