import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Dispatcher from './components/Dispatcher';
import PendingOrders from './components/PendingOrders';
import ApprovedOrders from './components/ApprovedOrders';
import ProcessingOrders from './components/ProcessingOrders';
import OngoingOrders from './components/OngoingOrders';
import CompletedOrders from './components/CompletedOrders';
import CancelledOrders from './components/CancelledOrders';
import RestaurantList from './components/RestaurantList';
import UserList from './components/UserList';

// import AdminLogin from './components/AdminLogin';
// import SignUp from './components/SignUp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {/* {isAuthenticated &&*/ <Sidebar />}
        <div className="main-content">
          {/* {isAuthenticated &&*/ <Header onLogout={handleLogout} />}
          <div className="content">
            <Routes>
              {/* <Route path="/login" element={<AdminLogin onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignUp />} />
              {isAuthenticated ? (
                <> */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dispatcher" element={<Dispatcher />}>
                    <Route path="pending-orders" element={<PendingOrders />} />
                    <Route path="approved-orders" element={<ApprovedOrders />} />
                    <Route path="processing-orders" element={<ProcessingOrders />} />
                    <Route path="ongoing-orders" element={<OngoingOrders />} />
                    <Route path="completed-orders" element={<CompletedOrders />} />
                    <Route path="cancelled-orders" element={<CancelledOrders />} />
                  </Route>
                  <Route path="/restaurantslist" element={<RestaurantList />} />
                  <Route path="/user" element={<UserList />} />
                {/* </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )} */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
