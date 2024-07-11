// src/components/orders/ApprovedOrders.js
import React from 'react';
import './Orders.css';

const ApprovedOrders = () => {
  // Sample data
  const orders = [
    {
      restaurantPhoto: 'path/to/photo.jpg',
      restaurantName: 'Restaurant B',
      status: 'Approved',
      orderNo: '12346',
      time: '30 mins ago',
      restaurantAddress: '124 Street, City',
      deliveryAddress: '457 Avenue, City'
    },
    // Add more orders here
  ];

  return (
    <div className="orders-container">
      <h2>Approved Orders</h2>
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
                <button className="process-button">Process</button>
                <button className="cancel-button">Cancel Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedOrders;
