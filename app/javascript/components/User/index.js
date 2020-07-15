import React from "react";
import SignUp from "./SignUp/SignUp";
import Scan from "./Scan";

import { Switch, Route } from "react-router-dom";

function User() {
  return (
    <Switch>
      <Route path="/scan">
        <Scan />
      </Route>
      <Route path="/">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default User;
