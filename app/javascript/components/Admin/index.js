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
    </>
  );
}

export default Admin;
