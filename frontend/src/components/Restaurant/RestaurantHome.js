import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "./RestaurantHome.css";
import RestaurantDashboard from "./RestaurantDashboard";
import IncomingOrders from "./IncomingOrders";
import CurrentOrders from "./CurrentOrders";
import OrderHistory from "./OrderHistory";
import Reviews from "./Reviews";
import Menu from "./Menu";
import Profile from "./Profile";
import CreateMenu from "./CreateMenu";
import UpdateMenu from "./UpdateMenu";
import MenuTable from "./MenuTable";

export default function RestaurantHome() {
  const [menu, setMenu] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState("/Restaurant/profile");
  const navigate = useNavigate();

  const onMenuAdd = (newMenuItem) => {
    setMenu([...menu, newMenuItem]);
  };

  useEffect(() => {
    navigate(defaultRoute);
    // Add your fetchUserDetail and fetchOrders functions here if needed
    window.scrollTo(0, 0);
  }, [navigate, defaultRoute]);

  return (
    <div className="restaurant-dashboard">
      <div className="sidebar">
        <div className="sidebar-tab btn btn-info">
          <NavLink
            to="/Restaurant/restaurantDashboard"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/restaurantDashboard")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">dashboard</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Dashboard
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/profile"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/profile")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </sub>
            </sub>
            &nbsp;&nbsp;Profile
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/menu"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/menu")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">lists</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Menu
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/incomingOrders"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/incomingOrders")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">ring_volume</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Incoming Orders
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/currentOrders"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/currentOrders")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">shopping_cart</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Current Orders
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/orderHistory"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/orderHistory")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">history</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Order History
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink
            to="/Restaurant/reviews"
            className="btn btn-info"
            onClick={() => setDefaultRoute("/Restaurant/reviews")}
          >
            <sub>
              <sub>
                <span className="material-symbols-outlined">reviews</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Ratings &#38; Reviews
          </NavLink>
        </div>
        <div className="sidebar-tab mb-3 btn btn-info">
          <NavLink to="/" className="btn btn-info">
            <sub>
              <sub>
                <span className="material-symbols-outlined">logout</span>
              </sub>
            </sub>
            &nbsp;&nbsp;Logout
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route
            path="/Restaurant/restaurantDashboard"
            element={<RestaurantDashboard />}
          />
          <Route
            path="/Restaurant/incomingOrders"
            element={<IncomingOrders />}
          />
          <Route path="/Restaurant/currentOrders" element={<CurrentOrders />} />
          <Route path="/Restaurant/orderHistory" element={<OrderHistory />} />
          <Route path="/Restaurant/reviews" element={<Reviews />} />
          <Route path="/Restaurant/menu" element={<Menu />} />
          <Route path="/Restaurant/profile" element={<Profile />} />
          <Route
            path="/Restaurant/createMenu"
            element={<CreateMenu onMenuAdd={onMenuAdd} />}
          />
          <Route path="/Restaurant/updateMenu" element={<UpdateMenu />} />
          <Route
            path="/Restaurant/MenuTable"
            element={<MenuTable menu={menu} setMenu={setMenu} />}
          />
        </Routes>
      </div>
    </div>
  );
}
