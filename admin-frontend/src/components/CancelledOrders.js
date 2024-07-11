// src/components/orders/CancelledOrders.js
import React from 'react';
import './Orders.css';

const CancelledOrders = () => {
  // Sample data
  const orders = [
    {
      restaurantPhoto: 'path/to/photo.jpg',
      restaurantName: 'Restaurant F',
      status: 'Cancelled',
      orderNo: '12350',
      time: '2 mins ago',
      restaurantAddress: '128 Street, City',
      deliveryAddress: '461 Avenue, City'
    },
    // Add more orders here
  ];

  return (
    <div className="orders-container">
      <h2>Cancelled Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Restaurant Photo</th>
            <th>Restaurant Name</th>
            <th>Status</th>
            <th>Order No.</th>
            <th>Time</th>
            <th>Restaurant Address</th>
            <th>Delivery Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td><img src={order.restaurantPhoto} alt="Restaurant" /></td>
              <td>{order.restaurantName}</td>
              <td>{order.status}</td>
              <td>{order.orderNo}</td>
              <td>{order.time}</td>
              <td>{order.restaurantAddress}</td>
              <td>{order.deliveryAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CancelledOrders;
