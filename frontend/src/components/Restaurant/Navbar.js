import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./final.png";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ownerToken") || localStorage.getItem("token");
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
        <NavLink to="/" className="">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        <div className="nav-link">
          {isLoggedIn ? (
            <>
              <div className="btn">
                <NavLink to="/Restaurant/addRestaurant" className="btn btn-dark">
                  Add a new restaurant
                </NavLink>
              </div>
              <div className="btn">
                <NavLink to="/Restaurant/viewRestaurant" className="btn btn-dark">
                  View existing restaurants
                </NavLink>
              </div>
              <div className="btn">
                <button onClick={handleLogout} className="btn btn-dark">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <h2 className="start-business-heading">Start Your Business Today</h2>
          )}
        </div>
      </nav>
    </header>
  );
}
