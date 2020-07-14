import React, { Component } from "react";
import "../styles";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  state = {
    loading: true,
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/merchant">
            <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
              Merchant
            </h1>
          </Route>
          <Route path="/admin">
            <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
              Admin
            </h1>
          </Route>
          <Route path="/">
            <h1 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
              User
            </h1>
          </Route>
        </Switch>
      </Router>
    );
  }
}
