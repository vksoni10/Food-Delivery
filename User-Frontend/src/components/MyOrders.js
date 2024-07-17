import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './MyOrders.css';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Get the token from local storage or cookies
                const token = localStorage.getItem('token'); // or use cookies if you store the token there
                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    return;
                }

                // Decode the token to get the user ID
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                console.log(userId);

                // Fetch orders using the user ID
                const response = await axios.get(`http://localhost:3001/order/myorders/${userId}`);
                setOrders(response.data.orders);
                setLoading(false);
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>My Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found</p>
                ) : (
                    <ul className="orders-list">
                        {orders.map(order => (
                            <li key={order._id} className="order-item">
                                <NavLink to={`/order-confirmation/${order._id}`} className="order-link">
                                    <h2>Order ID: {order._id}</h2>
                                    <p>Status: {order.status}</p>
                                    <p>Total Price: ${order.totalPrice}</p>
                                    <ul className="order-items">
                                        {order.items.map(item => (
                                            <li key={item._id} className="order-item-detail">
                                                {item.name} - {item.quantity} x ${item.individualPrice}
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default MyOrders;
