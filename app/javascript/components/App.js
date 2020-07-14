import React, { Component } from "react";
import "../styles";
import "remixicon/fonts/remixicon.css";

export default class App extends Component {
  state = {
    loading: true,
  };

  render() {
    return <h1 className="text-xl font-bold text-center">Hey there!</h1>;
  }
}
