import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';
import Navbar from './Navbar';
import Checkout from './Checkout';
import { jwtDecode } from 'jwt-decode';

const Cart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const userName = decodedToken.name; // Assuming the token contains the user's name
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

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

  const handleCheckout = async () => {
    setShowOverlay(true); // Show overlay
    try {
      const response = await axios.post('http://localhost:3001/order/create', {
        userId,
        userName,
        items: cartItems,
        totalPrice: total
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newOrder = response.data.order;
      // Clear cart items after successful order creation
      setCartItems([]);
      setSubtotal(0);
      setTax(0);
      setTotal(0);
      // Delay navigation using Promise.resolve with setTimeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate(`/order-confirmation/${newOrder._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setShowOverlay(false); // Hide overlay after navigation
    }
  };
  
  
  return (
    <>
      <Navbar />
      {showOverlay && <Checkout />}
      <div className="cart-container">
        <h2>Your Order</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item._id}>
              <span>{item.name} x {item.quantity}<br /> Ordering from: {item.itemRestro}</span>
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
        <button onClick={handleCheckout} disabled={cartItems.length === 0} className='checkout-button'>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
