import React, { useState } from "react";
import states from "./states.js";
import ComponentByState from "./ComponentByState";

function Scan() {
  const [state, setState] = useState(states.SCANNING);
  const [merchantDetails, setMerchantDetails] = useState({
    name: "",
    address: "",
  });

  const resetState = () => {
    setState(states.SCANNING);
  };

  const findMerchantDetails = () => {
    setMerchantDetails({
      name: "Lulu Hypermarket",
      address: "Edapally, Kochi",
    });
    setState(states.SUCCESS);
  };

  const onScanned = (merchantCode) => {
    findMerchantDetails(merchantCode);
  };

  const onError = () => {
    setState(states.ERROR_QR_READ);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Scan QR Code
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Please scan the QR code before entering any shop/establishment.
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white p-6 shadow sm:rounded-lg sm:px-10">
            <ComponentByState
              state={state}
              onScanned={onScanned}
              onError={onError}
              resetState={resetState}
              merchantDetails={merchantDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scan;
