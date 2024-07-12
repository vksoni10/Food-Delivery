import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';
import { fetchUserInfo } from './userApi';
import { useParams } from 'react-router-dom';

const Order = ({ restaurant }) => {
  const {id} = useParams();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [itemInCart, setItemInCart] = useState({});

  useEffect(() => {
    fetchUserProfile();
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

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:3001/cart/add-to-cart', {
        resId: id,  // Adjust this as per your backend API requirements
        dishName: item.dishName,
        email: user.email,  // Assuming you have user email from fetchUserInfo
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
console.log(itemInCart)
  return (
    <div id="order">
      <h2 className="h">Menu</h2>
      <table className="menu-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurant.menu.map((item) => (
            <tr key={item._id}>
              <td>{item.dishName}</td>
              <td>₹{item.price}</td>
              <td>
                <div className="cart-actions">
                  {!itemInCart[item._id] ? (
                    <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  ) : (
                    <>
                      <button>-</button>
                      <span>
                        {cart.find((cartItem) => cartItem.productId === item._id)?.quantity || 0}
                      </span>
                      <button>+</button>
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
