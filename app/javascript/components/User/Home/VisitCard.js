import React from "react";
import dayjs from "dayjs";

import Button from "components/Common/Button";

const data = {
  id: 1,
  name: "Lulu Hypermarket",
  entry_at: "2020-07-17T02:46:43.566+05:30",
  visitable_id: "192d8213-3016-43d2-84e9-1b6c97c0c4e3",
  visitable_type: "Merchant",
};

function VisitCard() {
  return (
    <li className="py-2 px-2 flex items-center justify-between">
      <div className="flex-shrink-0 truncate">
        <h3 className="font-medium leading-8 text-gray-900 text-base">
          {data.name}
        </h3>
        <p className="text-gray-500 text-sm">
          {dayjs().to(dayjs(data.entry_at))}
        </p>
      </div>
      <Button colorType="secondary" sizeType="sm">
        EXIT
      </Button>
    </li>
  );
}

export default VisitCard;
