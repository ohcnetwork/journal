import React from "react";

function TableHead({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              key={column.title}
              className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHead;
