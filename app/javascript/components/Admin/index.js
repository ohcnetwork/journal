import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import SignIn from "./SignIn";
import AdminHome from "./AdminHome";

function Admin() {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.url}/login`}>
        <SignIn />
      </Route>
      <Route exact path={`${match.url}/`}>
        <AdminHome />
      </Route>
    </>
  );
}

export default Admin;
