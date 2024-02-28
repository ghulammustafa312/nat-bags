import React from "react";
import TableComponent from "../../../components/Table/Table";
import { getOrderService } from "../../../services/order-services/getOrderService";
import "./Order.css";
import { Button } from "antd";

const DashboardOrder = () => {
  const [orders, setOrders] = React.useState([]);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "_id",
      render: (text, record) => <p style={{ fontWeight: "bolder" }}>{record?._id}</p>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <p>
          {record?.deliveryAddress?.street}, {record?.deliveryAddress?.city}, {record?.deliveryAddress?.country}
        </p>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },
    {
      title: "Products",
      dataIndex: "amountPaid",
      key: "amountPaid",
      render: (text, record) => (
        <div>
          {record?.orderedProducts?.length > 0 &&
            record?.orderedProducts?.map((product) => (
              <div key={product?.id}>
                <p>{product?.name}</p>
                <img className="order-image" src={product?.img} alt={product?.name} />
                {/*    <span> x {product.qty}</span>  */}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <p style={{ fontSize: "20px", fontWeight: "bold" }}>{record?.status || "Delivered"}</p>,
    },
  ];

  const fetchOrders = async () => {
    const res = await getOrderService();
    setOrders(res?.data?.data || []);
  };
  React.useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="dashboard-main-container">
      <h1 className="dashboard-heading">Orders</h1>

      <TableComponent columns={columns} data={orders} showEdit={false} />
    </div>
  );
};

export default DashboardOrder;
