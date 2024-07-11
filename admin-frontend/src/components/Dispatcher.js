// src/components/Dispatcher.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Dispatcher.css';

const Dispatcher = () => {
  const ordersCount = {
    pending: 10,
    approved: 5,
    processing: 7,
    ongoing: 3,
    completed: 15,
    cancelled: 2,
  };

  return (
    <div className="dispatcher-container">
      <div className="buttons-container">
        <NavLink to="pending-orders" className="order-button">
          Pending Orders ({ordersCount.pending})
        </NavLink>
        <NavLink to="approved-orders" className="order-button">
          Approved Orders ({ordersCount.approved})
        </NavLink>
        <NavLink to="processing-orders" className="order-button">
          Processing Orders ({ordersCount.processing})
        </NavLink>
        <NavLink to="ongoing-orders" className="order-button">
          Ongoing Orders ({ordersCount.ongoing})
        </NavLink>
        <NavLink to="completed-orders" className="order-button">
          Completed Orders ({ordersCount.completed})
        </NavLink>
        <NavLink to="cancelled-orders" className="order-button">
          Cancelled Orders ({ordersCount.cancelled})
        </NavLink>
      </div>
      <div className="orders-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dispatcher;
