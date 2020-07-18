import React from "react";
import dayjs from "dayjs";

import Button from "components/Common/Button";
import { exitVisit } from "Apis/visits";

function VisitCard({ data, refetch }) {
  const handleExit = async () => {
    await exitVisit(data.id);
    refetch();
  };
  return (
    <li className="py-2 flex items-center justify-between rounded-md">
      <div className="truncate">
        <h3 className="font-medium leading-8 text-gray-900 text-base">
          {data.name}
        </h3>
        <p className="font-medium leading-5 text-gray-600 text-sm truncate">
          {data.address}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {dayjs().to(dayjs(data.entry_at))}
        </p>
      </div>
      <Button colorType="secondary" sizeType="sm" onClick={handleExit}>
        EXIT
      </Button>
    </li>
  );
}

export default VisitCard;
