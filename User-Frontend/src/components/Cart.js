import React, { useContext } from 'react';

import './Cart.css';

function Cart() {
  const { cartItems, totalCost } = useContext();

  return (
    <>
      <h1>Your Order</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${totalCost.toFixed(2)}</p>
      <button>Checkout</button>
    </>
  );
}

export default Cart;