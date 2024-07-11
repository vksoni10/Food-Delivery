// src/components/orders/ProcessingOrders.js
import React from 'react';
import './Orders.css';

const ProcessingOrders = () => {
  // Sample data
  const orders = [
    {
      restaurantPhoto: 'path/to/photo.jpg',
      restaurantName: 'Restaurant C',
      status: 'Processing',
      orderNo: '12347',
      time: '15 mins ago',
      restaurantAddress: '125 Street, City',
      deliveryAddress: '458 Avenue, City'
    },
    // Add more orders here
  ];

  return (
    <div className="orders-container">
      <h2>Processing Orders</h2>
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
            <th>Actions</th>
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
              <td>
                <button className="ship-button">Shipped</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessingOrders;
