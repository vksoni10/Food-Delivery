// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">Potato</div>
      <div className="super-admin">
        <div className="dropdown">
          <button className="dropbtn">Super Admin</button>
          <div className="dropdown-content">
            <a href="#">Change Password</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
