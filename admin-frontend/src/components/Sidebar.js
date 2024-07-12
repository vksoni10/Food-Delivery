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
      
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dispatcher/pending-orders" activeClassName="active">
              Order Deliveries List
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurantslist" activeClassName="active">
            Restaurant List
            </NavLink>
          </li>
    
          <li>
            <NavLink to="/user" activeClassName="active">
              User
            </NavLink>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
