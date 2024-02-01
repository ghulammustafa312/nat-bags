import React from "react";
import TableComponent from "../../../components/Table/Table";

const DashboardOrder = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Doe",
      age: 30,
      address: "123 Main St",
    },
    {
      key: "2",
      name: "Jane Doe",
      age: 25,
      address: "456 Oak St",
    },
  ];
  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-heading">Orders</h1>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default DashboardOrder;
