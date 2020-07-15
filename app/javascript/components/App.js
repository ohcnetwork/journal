import React, { Component, useState, useEffect } from "react";
import "../styles";
import "remixicon/fonts/remixicon.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import User from "./User";
import SignIn from "./User/SignIn";
import Merchant from "./Merchant";
import Admin from "./Admin";
import { isLoggedIn } from "../apis/Auth";

const PrivateRoute = ({ children, ...rest }) => {
  const [loading, setLoading] = useState(false);
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
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default class App extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <SignIn />
          </Route>
          <PrivateRoute path="/merchant">
            <Merchant />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/">
            <User />
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}
