// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="content">
            <Routes>
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
              <Route path="/users" element={<UserList />} />
              {/* Define routes for other components here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
