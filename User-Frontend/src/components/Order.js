import React, { useState } from 'react';
import './Order.css';

const Order = ({ restaurant, cart, handleAddToCart, handleUpdateQuantity }) => {
  const [itemInCart, setItemInCart] = useState({});

  const addToCart = (item) => {
    handleAddToCart(item);
    setItemInCart({ ...itemInCart, [item._id]: true });
  };

  const updateQuantity = (item, quantity) => {
    handleUpdateQuantity(item, quantity);
    if (quantity === 0) {
      setItemInCart({ ...itemInCart, [item._id]: false });
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
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          updateQuantity(
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
                          updateQuantity(
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
