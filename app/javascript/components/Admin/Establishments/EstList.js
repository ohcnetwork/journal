import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

import Table from "Common/Table";

function EstList({ loading, error, data }) {
  const match = useRouteMatch();

  const renderLink = (id) => (
    <Link to={`${match.url}/${id}`}>View Visitors</Link>
  );

  const columns = [
    {
      title: "Merchant Name",
      dataIndex: "name",
      className: "text-gray-900",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: " ",
      dataIndex: "id",
      render: renderLink,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Could not retrieve merchant list. Please try again.</p>;
  }
  return <Table dataKey="id" columns={columns} data={data} />;
}

export default EstList;
