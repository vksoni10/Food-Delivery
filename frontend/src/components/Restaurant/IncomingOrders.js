import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./IncomingOrder.css";

const IncomingOrders = () => {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { resName } = decoded;

        try {
          const response = await axios.get(
            `http://localhost:3001/orders/${resName}`
          );
          const orders = response.data;

          setIncomingOrders(
            orders.filter((order) =>
              ["Order Created", "Order Accepted"].includes(order.status)
            )
          );
          setCurrentOrders(
            orders.filter((order) => order.status === "Order is Being Prepared")
          );
          setOrderHistory(
            orders.filter((order) =>
              ["Order Has Been Prepared", "Order Delivered"].includes(
                order.status
              )
            )
          );
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:3001/orders/updateStatus/${orderId}`, {
        status,
      });
      // Refetch orders after status update
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { resName } = decoded;

        const response = await axios.get(
          `http://localhost:3001/orders/${resName}`
        );
        const orders = response.data;

        setIncomingOrders(
          orders.filter((order) =>
            ["Order Created", "Order Accepted"].includes(order.status)
          )
        );
        setCurrentOrders(
          orders.filter((order) => order.status === "Order is Being Prepared")
        );
        setOrderHistory(
          orders.filter((order) =>
            ["Order Has Been Prepared", "Order Delivered"].includes(
              order.status
            )
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderOrderSection = (title, orders, statusOptions) => (
    <div className="order-section">
      <h2>{title}</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <h3>Order #{order._id}</h3>
            <p>User: {order.userName}</p>
            <p>Total Price: ₹{order.totalPrice}</p>
          </div>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item._id} className="order-item">
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.individualPrice}</p>
              </div>
            ))}
          </div>
          <div className="order-status">
            <select
              value={order.status}
              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="orders-container">
      {renderOrderSection("Incoming Orders", incomingOrders, [
        "Order Created",
        "Order Accepted",
        "Order is Being Prepared",
        "Order Has Been Prepared",
        "Order Delivered",
      ])}
      {renderOrderSection("Current Orders", currentOrders, [
        "Order Created",
        "Order Accepted",
        "Order is Being Prepared",
        "Order Has Been Prepared",
        "Order Delivered",
      ])}
      {renderOrderSection("Order History", orderHistory, [
        "Order Created",
        "Order Accepted",
        "Order is Being Prepared",
        "Order Has Been Prepared",
        "Order Delivered",
      ])}
    </div>
  );
};

export default IncomingOrders;
