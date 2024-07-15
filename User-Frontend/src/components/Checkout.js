import React, { useEffect } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout() {

  return (
    <div className="success-message">
      <div className="tick-mark">
        <div className="tick"></div>
      </div>
      <h1>Order Placed Successfully</h1>
    </div>
  );
}

export default Checkout;
