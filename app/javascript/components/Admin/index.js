import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import SignIn from "./SignIn";

function Admin() {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.url}/login`}>
        <SignIn />
      </Route>
      <Route exact path={`${match.url}/`}>
        <h1 className="text-xl leading-6 font-bold">Admin</h1>
      </Route>
    </>
  );
}

export default Admin;
