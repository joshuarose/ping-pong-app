import React from "react";
import { Route, Switch } from "react-router-dom";
import RegisterUserForm from "./Home";
import Login from "./Login";
import AppliedRoute from "./components/AppliedRoute";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={RegisterUserForm} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <Route component={RegisterUserForm} />
  </Switch>;