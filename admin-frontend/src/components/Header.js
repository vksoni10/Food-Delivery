import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './final.png';

const Header = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    setIsLoggedIn(false);
    onLogout(); // Call onLogout to update authentication state in App component
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    setIsLoggedIn(!!token); // Update logged-in state based on token presence
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="super-admin">
            <div className="dropdown">
              <button className="dropbtn">Admin</button>
              <div className="dropdown-content">
                <a href="#" onClick={handleLogout}>Logout</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="start-business-heading">Start Your Business Today</h2>
      )}
    </div>
  );
};

export default Header;
