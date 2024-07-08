import React from 'react';
import './Navbar.css'; // Ensure you import the correct CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../components/final.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        console.log(response.data.message); // "Logout successful"
        navigate('/auth/login'); // Redirect to login page
      } else {
        console.error(response.data.message); // Handle logout failure
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo" />
      </NavLink>
      <div className="nav-links">
        <NavLink to="/auth/login" className="navbutton">Login</NavLink>
        <NavLink to="/auth/cart" className="navbutton">Cart</NavLink>
        <NavLink to="/auth/register" className="navbutton">Register</NavLink>
        <button className="navbutton" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
