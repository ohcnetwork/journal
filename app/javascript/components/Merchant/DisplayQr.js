import React from "react";

import useGetQrUrl from "./useGetQrUrl";

/**
 * Display generated QR code with code passed through query parameter in URL.
 * If code is not present user is redirected to merchant page.
 * Provides merchant instructions when on screen, these are hidden in print mode.
 */
function DisplayQr() {
  const qrCodeUrl = useGetQrUrl();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center md:py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="print:hidden">
          <h2 className="mt-6 mb-4 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Your QR Code is Ready
          </h2>
          <p className="mt-2 text-center text-sm leading-6 text-gray-600 max-w">
            <span>
              Please print out this QR code and display it in a recognised area.
            </span>
            <br />
            <span>
              You can print this page now by pressing Ctrl+P or selecting File
              &lt; Print
            </span>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-6 px-4 shadow sm:rounded-lg sm:px-10">
            <p className="mt-2 text-gray-700 leading-6 text-md text-center max-w">
              <span>Please scan QR code using</span>
              <br />
              <span className="text-indigo-700">
                https://journal.coronasafe.network
              </span>
              <br />
              <span>when you enter and exit this area.</span>
            </p>
            {qrCodeUrl && <img src={qrCodeUrl} alt="" />}
          </div>
        </div>
        <div className="w-full mt-4 text-center print:hidden">
          <a
            href="/merchant"
            className="text-sm leading-5 text-gray-600 max-w text-indigo-600"
          >
            Generate another one.
          </a>
        </div>
      </div>
    </div>
  );
}

export default DisplayQr;
