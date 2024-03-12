import React, { useEffect, useState } from "react";
import { useUserData } from "../../../contexts/UserDataProvider";
import "./Orders.css";
import { getOrderService } from "../../../services/order-services/getOrderService";

export const Orders = () => {
  const { userDataState, dispatch } = useUserData();
  const [ordersLoading, serOrdersLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      serOrdersLoading(true);
      const { data } = await getOrderService();
      dispatch({
        type: "SET_USER_ORDERS",
        payload: data?.data,
      });
    } catch (error) {
    } finally {
      serOrdersLoading(false);
    }
  };

  return !userDataState.orders?.length ? (
    <div className="orders-container">{ordersLoading ? "Loading" : "No Orders"}</div>
  ) : (
    <div className="orders-container">
      {userDataState.orders?.map(({ amountPaid, deliveryAddress, _id: orderId, orderedProducts, paymentId }) => (
        <div key={orderId} className="ordered-items-card">
          <div className="order-id-container">
            <span>Order ID: </span>
            <span>{orderId}</span>
          </div>
          <div className="payment-id-container">
            <span>Payment ID: </span>
            <span>{paymentId}</span>
          </div>
          <div className="price-container">
            <span>Amount: </span>
            <span>Rs {amountPaid}</span>
          </div>
          <div className="price-container">
            <span>Delivery-Address:</span>
            <span>
              {deliveryAddress?.street} {deliveryAddress?.state} {deliveryAddress?.country}
            </span>
          </div>
          <div className="products-container">
            {orderedProducts?.map(({ id, img, name, discounted_price, qty }) => (
              <div className="products-card" key={id}>
                <img src={img} alt={name} />
                <div className="description">
                  <span className="name">Name: {name}</span>
                  <span className="qty">Qty: {qty}</span>
                  <span className="price">Price: Rs {discounted_price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
