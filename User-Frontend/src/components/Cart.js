import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'
import Navbar from './Navbar';
import {jwtDecode} from 'jwt-decode';





const Cart = () => {    
  const token = localStorage.getItem('token'); // Or wherever you store the token
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const getCartItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cart/get-cart-items', {
        params: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Cart items:', response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  
  
  getCartItems();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/cart/add-to-cart')
      .then(response => {
        setCartItems(response.data);
        calculateTotals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const calculateTotals = (cartItems) => {
    let subtotal = 0;
    let tax = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    tax = subtotal * 0.18; // 18% tax rate
    setSubtotal(subtotal.toFixed(2));
    setTax(tax.toFixed(2));
    setTotal((subtotal + tax).toFixed(2));
  };

  const handleRemoveItem = (itemId) => {
    axios.delete(`/api/cart/${itemId}`)
      .then(response => {
        setCartItems(response.data);
        calculateTotals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    axios.patch(`/api/cart/${itemId}`, { quantity: quantity })
      .then(response => {
        setCartItems(response.data);
        calculateTotals(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
<>
    <Navbar/>
    <div className="cart-container">
      <h2>Your Order</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleUpdateQuantity(item.id, e.target.value)}
            />
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