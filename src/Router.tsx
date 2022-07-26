import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Top } from './pages';

const Router = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/:date?" exact={true} component={Top} />
    </Switch>
  </BrowserRouter>
);

export default Router;
