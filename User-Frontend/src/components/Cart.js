import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
import Navbar from './Navbar';
import {jwtDecode} from 'jwt-decode';

const Cart = () => {
  const token = localStorage.getItem('token'); 
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const getCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cart/get-cart-items', {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Cart items:', response.data.cart.items);
      setCartItems(response.data.cart.items);
      
      calculateTotals(response.data.cart.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  const Cartlen = localStorage.setItem("cartcount",cartItems.length);

  useEffect(() => {
    getCartItems();
  }, []);

  const calculateTotals = (items) => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.individualPrice * item.quantity;
    });
    const tax = subtotal * 0.18; // 18% tax rate
    setSubtotal(subtotal.toFixed(2));
    setTax(tax.toFixed(2));
    setTotal((subtotal + tax).toFixed(2));
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/cart/remove-item/${itemId}`, {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cart.items);
      calculateTotals(response.data.cart.items);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };
  
  const handleUpdateQuantity = async (itemId, action) => {
    try {
      const response = await axios.patch(`http://localhost:3001/cart/update-item`, {
        userId: userId,
        itemId: itemId,
        action: action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.cart.items);
      calculateTotals(response.data.cart.items);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h2>Your Order</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <span>{item.name} x {item.quantity}</span>
              <span>₹{item.individualPrice * item.quantity}</span>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              <button onClick={() => handleUpdateQuantity(item._id, 'decrease')}>-</button>
              <button onClick={() => handleUpdateQuantity(item._id, 'increase')}>+</button>
            </li>
          ))}
        </ul>
        <div className="cart-totals">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Tax: ₹{tax}</p>
          <p>Total: ₹{total}</p>
        </div>
        <Link to="/auth/checkout" className='checkout-link'>Proceed to Checkout</Link>
      </div>
    </>
  );
};

export default Cart;
