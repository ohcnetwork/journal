import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { isLoggedIn } from "Apis/Auth";
import SignUp from "./SignUp/SignUp";
import Scan from "./Scan";

const PrivateRoute = ({ children, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState([]);

  useEffect(() => {
    async function userLoggedIn() {
      setLoading(true);
      const userLoggedIn = await isLoggedIn();
      setLoggedIn(userLoggedIn);
      setLoading(false);
    }
    userLoggedIn();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

function User() {
  return (
    <Switch>
      <PrivateRoute path="/scan">
        <Scan />
      </PrivateRoute>
      <Route path="/">
        <SignUp />
      </Route>
    </Switch>
  );
}

export default User;
