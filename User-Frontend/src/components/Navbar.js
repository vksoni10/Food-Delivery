import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Ensure you import the correct CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../components/final.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        console.log(response.data.message); // "Logout successful"
        localStorage.removeItem('token'); // Remove the token from localStorage
        setIsLoggedIn(false); // Set isLoggedIn to false
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
        {isLoggedIn ? (
          <>
            <NavLink to="/auth/cart" className="navbutton"><span class="material-symbols-outlined">
shopping_cart
</span></NavLink>
            <NavLink to="/auth/profile" className="navbutton"><span class="material-symbols-outlined">
person
</span></NavLink>
            <NavLink to='/auth/logout' className="navbutton" onClick={handleLogout}><span class="material-symbols-outlined">
logout
</span></NavLink>
          </>
        ) : (
          <>
            <NavLink to="/auth/login" className="navbutton">Login</NavLink>
            <NavLink to="/auth/register" className="navbutton">Register</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
