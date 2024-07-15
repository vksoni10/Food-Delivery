import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { fetchUserInfo } from './userApi';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {toast} from 'react-toastify'


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
      console.log('Error fetching user profile:', err);
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
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cart items fetched:', response.data.cart.items);
      setCart(response.data.cart.items);

      const itemsInCart = response.data.cart.items.reduce((acc, item) => {
        acc[item.productId] = true;
        return acc;
      }, {});
      console.log('Items in cart:', itemsInCart);
      setItemInCart(itemsInCart);
    } catch (err) {
      console.log('Error fetching cart items:', err);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.post('http://localhost:3001/cart/add-to-cart', {
        resId: id,
        dishName: item.dishName,
        email: user.email,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Item added successfully`, {
        autoClose: 1000,
      });
      fetchCartItems(); // Refresh the cart items after adding
    } catch (error) {
      toast.error('Error adding item to cart:', error);
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
        action: action,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Update quantity response:', response.data);
      setCart(response.data.cart.items);

      const itemsInCart = response.data.cart.items.reduce((acc, item) => {
        acc[item.productId] = true;
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
      <div className="menu-list">
        {restaurant.menu.map((item) => (
          <div className="menu-item" key={item._id}>
            <div className="item-details">
            <span className="dish-image" style={{ backgroundImage: `url(${item.dishImage})` }}></span>

              <span className="item-name">{item.dishName}</span>
              <span className="item-price">₹{item.price}</span>
            </div>
            <div className="cart-actions">
              {!itemInCart[item._id] ? (
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              ) : (
                <>
                  <button onClick={() => handleUpdateQuantity(item._id, 'decrease')}>-</button>
                  <span>
                    {cart.find((cartItem) => cartItem.productId === item._id)?.quantity || 0}
                  </span>
                  <button onClick={() => handleUpdateQuantity(item._id, 'increase')}>+</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
