import React from "react";
import { Route, useRouteMatch } from "react-router-dom";

import GenerateForm from "./GenerateForm";
import DisplayQr from "./DisplayQr";

function Merchant() {
  const match = useRouteMatch();

  return (
    <>
      <Route exact path={`${match.url}`}>
        <GenerateForm />
      </Route>
      <Route path={`${match.url}/qr`}>
        <DisplayQr />
      </Route>
    </>
  );
}

export default Merchant;
