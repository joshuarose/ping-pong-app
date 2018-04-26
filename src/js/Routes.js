import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegisterUserForm from './Home';
import Login from './Login';
import AppliedRoute from './components/AppliedRoute';
import CreatePlayer from './CreatePlayer';
import About from './AmyHowes';

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute
      path="/"
      exact
      component={RegisterUserForm}
      props={childProps}
    />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute
      path="/player/new"
      exact
      component={CreatePlayer}
      props={childProps}
    />
    <Route path="/about" exact component={About} />
    <AppliedRoute component={RegisterUserForm} props={childProps} />
  </Switch>
);
