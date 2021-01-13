import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './screens/Home/Home';
import Single from './screens/Single/index';
import NotFound from './screens/NotFound/index';

const Router = () => (
  <BrowserRouter>
  <div className="main">
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        exact
        path="/movie/:movieid"
        component={Single}
          />
      <Route
        component={NotFound}
      />
    </Switch>
  </div>
  </BrowserRouter>
);

export default Router;
