import React from 'react';
import './Navbar.css'; // Ensure you import the correct CSS file
import { NavLink } from 'react-router-dom';
import logo from '../components/final.png';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo" />
        
      </NavLink>
      <div className="nav-links">
        <NavLink to='/auth/login' className="navbutton">Login</NavLink>
        <NavLink to='/auth/restaurants' className="navbutton">Cart</NavLink>
        <NavLink to='/auth/register' className="navbutton">Register</NavLink>
      </div>
    </header>
  );
}

export default Navbar;
