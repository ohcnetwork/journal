import React from "react";
import QrScanner from "./QrScanner";
import Success from "./Success";
import Error from "./Error";
import states from "./states.json";

const ComponentByState = ({
  state,
  onScanned,
  onError,
  merchandDetails,
  resetState,
}) => {
  switch (state) {
    case states.SCANNING:
      return <QrScanner onScanned={onScanned} onError={onError} />;
    case states.SUCCESS:
      return (
        <Success
          name={merchandDetails.name}
          address={merchandDetails.address}
          resetState={resetState}
        />
      );
    case states.ERROR_QR_READ:
      return <Error state={state} resetState={resetState} />;
    case states.ERROR_MERCHAND:
      return <Error state={state} resetState={resetState} />;
  }
};

export default ComponentByState;
