import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./final.png";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("ownerToken") || localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ownerToken");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <nav className="navbar navbar-dark bg-dark">
        <div className="navbar-brand">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo" />
          </NavLink>
        </div>
        {isLoggedIn ? (
          <div className="navbar-nav">
            <NavLink to="/Restaurant/addRestaurant" className="nav-link">
              <button className="btn btn-dark">Add a new restaurant</button>
            </NavLink>
            <NavLink to="/Restaurant/viewRestaurant" className="nav-link">
              <button className="btn btn-dark">
                View existing restaurants
              </button>
            </NavLink>
            <NavLink to="/" onClick={handleLogout} className="nav-link">
              <button className="btn btn-dark">Logout</button>
            </NavLink>
          </div>
        ) : (
          <h2 className="start-business-heading">Start Your Business Today</h2>
        )}
      </nav>
    </header>
  );
}
