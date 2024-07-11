// src/components/orders/OngoingOrders.js
import React from 'react';
import './Orders.css';

const OngoingOrders = () => {
  // Sample data
  const orders = [
    {
      restaurantPhoto: 'path/to/photo.jpg',
      restaurantName: 'Restaurant D',
      status: 'Ongoing',
      orderNo: '12348',
      time: '10 mins ago',
      restaurantAddress: '126 Street, City',
      deliveryAddress: '459 Avenue, City'
    },
    // Add more orders here
  ];

  return (
    <div className="orders-container">
      <h2>Ongoing Orders</h2>
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
                <button className="complete-button">Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OngoingOrders;
