import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Scan from "../Scan";
import Header from "./Header";
import Content from "./Content";

function Home() {
  const match = useRouteMatch();

  return (
    <div className="min-h-screen">
      <Header />
      <Route path={`${match.url}/`} exact>
        <Content />
      </Route>
      <Route path={`${match.url}/scan`}>
        <Scan />
      </Route>
    </div>
  );
}

export default Home;
