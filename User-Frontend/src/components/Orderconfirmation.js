import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/order/${orderId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOrder(response.data.order);
      setStatus(response.data.order.status);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);

  return (
    <>
      <Navbar />
      <div className="order-confirmation-container">
        <h2>Order Details</h2>
        {order ? (
          <>
            <h4>Status: {status}</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <br />
                  <span>₹{item.individualPrice * item.quantity}</span>
                  <br />
                  <span>Restaurant: {item.itemRestro}</span>
                </li>
              ))}
            </ul>
            <div className="order-totals">
              <div className='totalp'>Total: ₹{order.totalPrice}</div>
              <div className='orderid'>Order ID: {order._id}</div>
            </div>
          </>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </>
  );
};

export default OrderConfirmation;
