import React, { useEffect } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timeout to navigate to the tracking page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/auth/track');
    }, 2000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

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
