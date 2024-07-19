// src/components/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Add your CSS styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/all-orders" activeClassName="active-link">All Orders</NavLink>
          </li>
          <li>
            <NavLink to="/restaurantslist" activeClassName="active-link">Restaurants List</NavLink>
          </li>
          <li>
            <NavLink to="/user" activeClassName="active-link">User List</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
