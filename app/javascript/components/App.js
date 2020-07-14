import React, { Component } from "react";
import "../styles";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import User from "./User";
import Merchant from "./Merchant";
import Admin from "./Admin";

export default class App extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <Router>
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
      </Router>
    );
  }
}
