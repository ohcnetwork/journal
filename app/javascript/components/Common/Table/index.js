import React from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import classnames from "classnames";

import TableHead from "./TableHead";

/**
 * Generic table component
 */
function Table({ columns, data, dataKey }) {
  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200 text-gray-500">
        <table className="min-w-full">
          <TableHead columns={columns} />
          <tbody>
            {data.map((dataItem) => {
              return (
                <tr key={get(dataItem, dataKey)}>
                  {columns.map(({ title, dataIndex, render, className }) => {
                    const item = get(dataItem, dataIndex);
                    return (
                      <td
                        key={title}
                        className={classnames(
                          "px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium",
                          className
                        )}
                      >
                        {render ? render(item, dataItem) : item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Table.propTypes = {
  /** Array of data source to display */
  data: PropTypes.array.isRequired,
  /** columns */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /** The key to look for in data for displaying data for this column. Supports dot operators */
      dataIndex: PropTypes.string,
      /** Title of the column */
      title: PropTypes.string,
    })
  ),
  /** Unique field within data */
  dataKey: PropTypes.string.isRequired,
};

export default Table;
