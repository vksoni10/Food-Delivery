import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Add your CSS styles

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
        </div>
      ) : (
        <h2 className="start-business-heading">Start Your Business Today</h2>
      )}
    </div>
  );
};

export default Sidebar;
