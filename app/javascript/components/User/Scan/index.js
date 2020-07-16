import React, { useState } from "react";
import states from "./states.js";
import ComponentByState from "./ComponentByState";
import { useHistory } from "react-router-dom";
import { logout } from "Apis/Auth";
import Button from "Common/Button";

function Scan() {
  const history = useHistory();
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

  const onLogout = () => {
    logout();
    history.push("/signUp");
  };

  return (
    <div className="min-h-screen flex flex-col py-12 px-6">
      <span className="self-end">
        <Button
          htmlType="button"
          colorType="primary"
          sizeType="lg"
          block
          onClick={onLogout}
        >
          Log out
        </Button>
      </span>
      <div className="bg-gray-50 flex flex-col justify-center">
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
    </div>
  );
}

export default Scan;
