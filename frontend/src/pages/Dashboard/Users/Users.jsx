import React from "react";
import TableComponent from "../../../components/Table/Table";
import { userService } from "../../../services/auth-services/userService";
import { Tag } from "antd";

const DashboardUser = () => {
  const [users, setUsers] = React.useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <p>
          {record?.firstName} {record?.lastName}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render:(role,record)=><Tag color={role=="USER"?"blue":"gold"}>{role?.toLowerCase()}</Tag>
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
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

  const fetchUsers = async () => {
    const res = await userService();
    setUsers(res?.data?.data || []);
  };
  React.useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-heading">Users</h1>
      <TableComponent columns={columns} data={users} showDelete={false} showEdit={false} />
    </div>
  );
};

export default DashboardUser;
