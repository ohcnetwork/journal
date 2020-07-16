import React, { Component, Suspense, lazy } from "react";
import "../styles";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import User from "./User";
const Merchant = lazy(() => import("./Merchant"));
const Admin = lazy(() => import("./Admin"));

export default class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/merchant">
              <Merchant />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <User />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
