import React, { useState } from "react";
import states from "./states.js";
import ComponentByState from "./ComponentByState";
import { logVisit } from "Apis/visits";
import Button from "Common/Button";
import { useHistory } from "react-router-dom";

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

  const onScanned = (merchantCode) => {
    setState(states.LOADING);
    logVisit(merchantCode, "Merchant")
      .then((response) => {
        if (response.data.visitable_id) {
          setMerchantDetails({
            name: response.data.name,
            address: response.data.address,
          });
          setState(states.SUCCESS);
        } else {
          setState(states.ERROR_MERCHANT);
        }
      })
      .catch(() => {
        setState(states.ERROR_MERCHANT);
      });
  };

  const onErrorScanning = () => {
    setState(states.ERROR_QR_READ);
  };

  return (
    <div className="min-h-screen flex flex-col py-12 px-6">
      <div className="flex flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {state != states.SUCCESS && (
            <>
              <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                Scan QR Code
              </h2>
              <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
                Hold your device over a QR Code so that it&apos;s clearly
                visible within the red box.
              </p>
            </>
          )}
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white p-6 shadow sm:rounded-lg sm:px-10">
              <ComponentByState
                state={state}
                onScanned={onScanned}
                onError={onErrorScanning}
                resetState={resetState}
                merchantDetails={merchantDetails}
              />
            </div>
          </div>
          <Button
            htmlType="button"
            className="mt-4"
            block
            colorType={state === states.SUCCESS && "primary"}
            onClick={() => {
              history.push("/user");
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Scan;
