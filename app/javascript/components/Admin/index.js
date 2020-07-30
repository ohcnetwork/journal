import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import AdminHome from "./AdminHome";

function Admin() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/login`}>
        <SignIn />
      </Route>
      <Route path={`${match.url}/`}>
        <AdminHome />
      </Route>
    </Switch>
  );
}

export default Admin;
