import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import useQuery from "Hooks/useQuery";

const chartApiRoot = "https://chart.googleapis.com/chart";

function DisplayQr() {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const history = useHistory();

  const queryParams = useQuery();
  useEffect(() => {
    const code = queryParams.get("code");
    if (!code) {
      history.push("/merchant");
    }
    const searchParams = new URLSearchParams();
    searchParams.set("cht", "qr");
    searchParams.set("chl", code);
    searchParams.set("chs", "500x500");
    searchParams.set("choe", "UTF-8");
    setQrCodeUrl(`${chartApiRoot}?${searchParams.toString()}`);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Your QR Code is Ready
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Please print out this QR code and display it in a recognised area.
        </p>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="mt-2 text-gray-700 leading-6 text-md text-center max-w">
              <span>Please scan QR code using</span>
              <br />
              <span className="text-indigo-700">
                https://journal.coronasafe.com
              </span>
              <br />
              <span>when you enter and exit this area.</span>
            </p>
            {qrCodeUrl && <img src={qrCodeUrl} alt="" />}
          </div>
        </div>
        <div className="w-full mt-4 text-center ">
          <a href="/merchant" className="text-sm leading-5 text-gray-600 max-w">
            Generate another one.
          </a>
        </div>
      </div>
    </div>
  );
}

export default DisplayQr;
