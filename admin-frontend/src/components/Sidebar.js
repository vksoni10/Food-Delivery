// src/components/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [dropdowns, setDropdowns] = useState({
    restaurantList: false,
    deliveryPeopleList: false,
    orderDeliveriesList: false,
    reviews: false,
    earningsReports: false,
    settings: false,
    pages: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  return (
    <div className="sidebar">
      <div className="logo"></div>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dispatcher" activeClassName="active">
              Dispatcher
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurantslist" activeClassName="active">
              Restaurant List
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="active">
              User
            </NavLink>
          </li>

         

          <li onClick={() => toggleDropdown('orderDeliveriesList')}>
            Order Deliveries List
          </li>
          {dropdowns.orderDeliveriesList && (
            <ul>
              <li>
                <NavLink to="/deliveries/pending" activeClassName="active">
                  Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/deliveries/approved" activeClassName="active">
                  Approved Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/deliveries/process" activeClassName="active">
                  Process Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/deliveries/ongoing" activeClassName="active">
                  Ongoing Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/deliveries/completed" activeClassName="active">
                  Completed Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/deliveries/cancelled" activeClassName="active">
                  Cancelled Deliveries
                </NavLink>
              </li>
            </ul>
          )}
          
          <li>
            <NavLink to="/promocode" activeClassName="active">
              Promocode
            </NavLink>
          </li>

          

          <li onClick={() => toggleDropdown('earningsReports')}>
            Earnings Reports
          </li>
          {dropdowns.earningsReports && (
            <ul>
              <li>
                <NavLink to="/reports/admin" activeClassName="active">
                  Admin Reports
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports/restaurants" activeClassName="active">
                  Restaurants Report
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports/drivers" activeClassName="active">
                  Driver Report
                </NavLink>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
