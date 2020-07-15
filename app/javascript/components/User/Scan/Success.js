import React from "react";
import Button from "Common/Button";

function Success({ name, address, resetState }) {
  return (
    <div>
      <h2 className="mb-1 text-center text-3xl leading-9 font-extrabold text-gray-900">
        {name}
      </h2>
      <p className="mb-4 text-center text-sm leading-5 text-gray-600 max-w">
        {address}
      </p>
      <Button colorType="primary" sizeType="lg" block onClick={resetState}>
        Exit
      </Button>
    </div>
  );
}

export default Success;
