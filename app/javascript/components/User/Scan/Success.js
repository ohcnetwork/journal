import React from "react";
import { Icon } from "@blueprintjs/core";

function Success({ name, address }) {
  return (
    <div>
      <div className="flex justify-center">
        <Icon icon={"tick-circle"} iconSize={44} className="text-green-600" />
      </div>
      <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
        Sucessfully logged your visit
      </p>

      <h2 className="mb-1 text-center text-xl leading-9 font-extrabold text-gray-900">
        {name}
      </h2>
      <p className="mb-4 text-center text-sm leading-5 text-gray-600 max-w">
        {address}
      </p>
    </div>
  );
}

export default Success;
