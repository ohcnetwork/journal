import React from "react";
import QrReader from "react-qr-reader";

function QrScanner({ onScanned, onError }) {
  const handleScan = (data) => {
    console.log("data", data);
    if (data) {
      onScanned(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
    onError(err);
  };
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default QrScanner;
