import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Received from './components/Received';
import AllOrders from './components/AllOrders';
import RestaurantList from './components/RestaurantList';
import UserList from './components/UserList';
import Processing from './components/Processing'
import Delivered from './components/Delivered'
import Cancelled from './components/Cancelled'
 
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for now to bypass login

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          {isAuthenticated && <Header onLogout={handleLogout} />}
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/received" element={<Received />} />
              <Route path="/processing" element={<Processing />} />
              <Route path="/delivered" element={<Delivered />} />
              <Route path="/cancelled" element={<Cancelled />} />
              <Route path="/all-orders" element={<AllOrders />} />
              <Route path="/restaurantslist" element={<RestaurantList />} />
              <Route path="/user" element={<UserList />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
