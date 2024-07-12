import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Order.css';

const Order = ({ restaurant }) => {
  const [cart, setCart] = useState([]);
  const [itemInCart, setItemInCart] = useState({});

  // useEffect(() => {
  //   // Fetch cart items from the backend on component mount
  //   axios.get('http://localhost:3001/cart/getCart')
  //     .then((response) => setCart(response.data))
  //     .catch((error) => console.error('Error fetching cart:', error));
  // }, []);

  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:3001/cart/add-item', {
        items: [{ ...item, quantity: 1 }],
      });

      if (response.status === 201) {
        if (response.data && Array.isArray(response.data.items)) {
          setCart(response.data.items);
        } else {
          setCart([]);
        }
        setItemInCart({ ...itemInCart, [item._id]: true });
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleUpdateQuantity = async (item, quantity) => {
    try {
      const updatedCart = cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity } : cartItem
      );

      setCart(updatedCart);

      const response = await axios.post('http://localhost:3001/cart/update-cart', {
        items: updatedCart,
      });

      if (response.status === 200) {
        if (quantity === 0) {
          setItemInCart({ ...itemInCart, [item._id]: false });
        }
      } else {
        console.error('Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

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
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item,
                            Math.max(
                              0,
                              cart.find((cartItem) => cartItem._id === item._id)?.quantity - 1
                            )
                          )
                        }
                        disabled={
                          !cart.find((cartItem) => cartItem._id === item._id)?.quantity
                        }
                      >
                        -
                      </button>
                      <span>
                        {
                          cart.find((cartItem) => cartItem._id === item._id)?.quantity || 0
                        }
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item,
                            (cart.find((cartItem) => cartItem._id === item._id)?.quantity ||
                              0) + 1
                          )
                        }
                      >
                        +
                      </button>
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
