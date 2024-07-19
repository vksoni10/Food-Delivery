import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllOrders.css'; // Include your CSS file here
import { NavLink } from 'react-router-dom';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [incomingOrders, setIncomingOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Admins/all');
        const fetchedOrders = response.data; // Adjust according to your API response structure
        setOrders(fetchedOrders);
        setIncomingOrders(
          fetchedOrders.filter((order) =>
            ['Order Created', 'Order Accepted'].includes(order.status)
          )
        );
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = incomingOrders.filter((order) =>
    order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const renderOrderSection = (title, orders) => (
    <div className="order-list">
      <h2>{title}</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userName}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity} x {item.individualPrice}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="orders-container">
       <div className="order-list">
      <div className="buttons-container">
        <NavLink to="/all-orders" className="order-button">All Orders</NavLink>
        <NavLink to="/received" className="order-button">Received Orders</NavLink>
        <NavLink to="/processing" className="order-button">Processing Orders</NavLink>
        <NavLink to="/delivered" className="order-button">Delivered Orders</NavLink>
        <NavLink to="/cancelled" className="order-button">Cancelled Orders</NavLink>
      </div>
      </div>
      {renderOrderSection('Received Orders', filteredOrders)}
    </div>
  );
};

export default AllOrders;
