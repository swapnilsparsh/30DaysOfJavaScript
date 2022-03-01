import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Results } from './Results';

export const Routes = () => (
  <div className="p-4">
    <Switch>
      <Route exact path="/">
        <Redirect to="/search" />
      </Route>
      <Route exact path="/search">
        <Results />
      </Route>
      <Route exact path="/images">
        <Results />
      </Route>
      <Route exact path="/news">
        <Results />
      </Route>
      <Route exact path="/videos">
        <Results />
      </Route>

    </Switch>
  </div>

);
