import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css'; // Ensure you import the correct CSS file
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../components/final.png';
import {jwtDecode} from 'jwt-decode';
import { CartContext } from './CartContext';


function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const token = localStorage.getItem('token');

  const {cartCount, setCartCount} = useContext(CartContext)

  // const {cartCount} = us
  

  const navigate = useNavigate();
  let userId = null;

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.id;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const getCartItems = async () => {
      try {
        const responsed = await axios.get('http://localhost:3001/cart/get-cart-items', {
          params: { userId },
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartCount(responsed.data.cart.totalQuantity);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (token) {
      getCartItems();
    }
  }, [userId]);

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
            <NavLink to="/auth/cart" className="navbutton">
              <span className="material-symbols-outlined">shopping_cart</span>
              <span className="cart-text">Cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>
            <NavLink to="/auth/profile" className="navbutton">
              <span className="material-symbols-outlined">person</span>
              <span className="cart-text">Profile</span>
            </NavLink>
            <NavLink to='/auth/logout' className="navbutton" onClick={handleLogout}>
              <span className="material-symbols-outlined">logout</span>
              <span className="cart-text">Logout</span>
            </NavLink>
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
