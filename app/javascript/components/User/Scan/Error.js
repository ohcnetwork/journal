import React from "react";
import Button from "Common/Button";
import states from "./states.json";

const errorMessages = {
  [states.ERROR_MERCHAND]: "You are scanning a wrong QR code!.",
  [states.ERROR_QR_READ]: "Something went wrong while reading QR code.",
};

function Error({ state, resetState }) {
  return (
    <div>
      <p className="text-center text-sm leading-5 text-red-600 max-w">
        {errorMessages[state]}
      </p>
      <p className="my-2 text-center text-sm leading-5 text-gray-600 max-w">
        Please try again.
      </p>
      <Button colorType="primary" sizeType="lg" block onClick={resetState}>
        Try again
      </Button>
    </div>
  );
}

export default Error;
