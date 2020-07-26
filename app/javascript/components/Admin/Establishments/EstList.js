import React from "react";

import Table from "Common/Table";

const columns = [
  {
    title: "Merchant Name",
    dataIndex: "visitable.name",
    className: "text-gray-900",
  },
  {
    title: "Address",
    dataIndex: "visitable.address",
  },
  {
    title: "Phone",
    dataIndex: "visitable.phone",
  },
];

function EstList({ loading, error, data }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not retrieve merchant list. Please try again.</p>;
  }
  return <Table columns={columns} data={data} />;
}

export default EstList;
