import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { fetchUserInfo } from './userApi';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Order = ({ restaurant }) => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [itemInCart, setItemInCart] = useState({});

  useEffect(() => {
    fetchUserProfile();
    fetchCartItems();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userInfo = await fetchUserInfo();
      if (userInfo) {
        setUser(userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get('http://localhost:3001/cart/get-cart-items', {
        params: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(response.data.cart.items);

      // Update itemInCart state to track items already in the cart
      const itemsInCart = response.data.cart.items.reduce((acc, item) => {
        acc[item.productId] = item.quantity; // Use productId as key to track presence and quantity in cart
        return acc;
      }, {});
      setItemInCart(itemsInCart);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:3001/cart/add-to-cart', {
        resId: id,
        dishName: item.dishName,
        email: user.email,
      });
      fetchCartItems(); // Refresh the cart items after adding
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, action) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.patch(`http://localhost:3001/cart/update-item`, {
        userId: userId,
        itemId: itemId,
        action: action
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data.cart.items);

      // Update itemInCart state after updating quantity
      const itemsInCart = response.data.cart.items.reduce((acc, item) => {
        acc[item.productId] = item.quantity; // Use productId as key to track presence and quantity in cart
        return acc;
      }, {});
      setItemInCart(itemsInCart);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  return (
    <div id="order">
      <h2 className="h">Menu</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurant.menu.map((item) => (
            <tr key={item._id}>
              <td className="dish-image" style={{ backgroundImage: `url(${item.dishImage})` }}></td>
              <td>{item.dishName}</td>
              <td>₹{item.price}</td>
              <td>
                <div className="cart-actions">
                  {!itemInCart[item._id] ? (
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  ) : (
                    <>
                      <button onClick={() => handleUpdateQuantity(item._id, 'decrease')}>-</button>
                      <span>
                        {itemInCart[item._id]}
                      </span>
                      <button onClick={() => handleUpdateQuantity(item._id, 'increase')}>+</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
