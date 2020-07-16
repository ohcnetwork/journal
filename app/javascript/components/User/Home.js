import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Scan from "./Scan";
import Header from "./Header";

function Home() {
  const match = useRouteMatch();

  return (
    <div className="min-h-screen">
      <Header />
      <Route path={`${match.url}/`} exact>
        <p>User Home</p>
      </Route>
      <Route path={`${match.url}/scan`}>
        <Scan />
      </Route>
    </div>
  );
}

export default Home;
