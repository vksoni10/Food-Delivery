import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Received from './components/Received';
import AllOrders from './components/AllOrders';
import RestaurantList from './components/RestaurantList';
import UserList from './components/UserList';
import Processing from './components/Processing';
import Delivered from './components/Delivered';
import Cancelled from './components/Cancelled';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ownerToken');
  };

  useEffect(() => {
    const handlePopState = (event) => {
      // Check if the user is navigating to the login page
      if (window.location.pathname === '/login') {
        localStorage.removeItem('ownerToken');
        setIsAuthenticated(false);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          {isAuthenticated && <Header onLogout={handleLogout} />}
          <div className="content">
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/received" element={<Received />} />
                <Route path="/processing" element={<Processing />} />
                <Route path="/delivered" element={<Delivered />} />
                <Route path="/cancelled" element={<Cancelled />} />
                <Route path="/all-orders" element={<AllOrders />} />
                <Route path="/restaurantslist" element={<RestaurantList />} />
                <Route path="/user" element={<UserList />} />
              </Route>
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
