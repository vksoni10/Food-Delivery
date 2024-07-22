import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import "./RestaurantHome.css";
import RestaurantDashboard from "./RestaurantDashboard";
import IncomingOrders from "./IncomingOrders";
import CurrentOrders from "./CurrentOrders";
import OrderHistory from "./OrderHistory";
import Reviews from "./Reviews";
import Menu from "./Menu";
import CreateMenu from "./CreateMenu";
import UpdateMenu from "./UpdateMenu";
import MenuTable from "./MenuTable";

export default function RestaurantHome() {
  const [menu, setMenu] = useState([]);
  const [defaultRoute, setDefaultRoute] = useState("/Restaurant/profile");
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const onMenuAdd = (newMenuItem) => {
    setMenu([...menu, newMenuItem]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // useEffect(() => {
  //   navigate(defaultRoute);
  //   // Add your fetchUserDetail and fetchOrders functions here if needed
  //   window.scrollTo(0, 0);
  // }, [navigate, defaultRoute]);

  return (
    <>
      <div className="toggle">
        <div className="toggle-btn-container">
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <>
                <div className="span">
                  <span class="material-symbols-outlined">arrow_back_ios</span>
                  <span>Collapse Sidebar</span>
                </div>
              </>
            ) : (
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            )}
          </button>
        </div>
        <div className="filler">
          <h3>
            <span>P</span>
            <span>o</span>
            <span>t</span>
            <span>a</span>
            <span>t</span>
            <span>o</span>
            <span>&nbsp;</span>
            <span>F</span>
            <span>o</span>
            <span>o</span>
            <span>d</span>
            <span>s</span>
          </h3>
        </div>
      </div>
      <div className="restaurant-dashboard">
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-tab btn mt-3">
            <NavLink
              to="/profile"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/Restaurant/restaurantDashboard")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">dashboard</span>
                </sub>
              </sub>
              &nbsp;&nbsp;Dashboard
            </NavLink>
          </div>
          <div className="sidebar-tab btn">
            <NavLink
              to="/Restaurant/menu"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/*")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">lists</span>
                </sub>
              </sub>
              &nbsp;&nbsp;Menu
            </NavLink>
          </div>
          <div className="sidebar-tab btn">
            <NavLink
              to="/orders"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/Restaurant/incomingOrders")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">ring_volume</span>
                </sub>
              </sub>
              &nbsp;&nbsp;Incoming Orders
            </NavLink>
          </div>
          <div className="sidebar-tab btn">
            <NavLink
              to="/Restaurant/currentOrders"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/Restaurant/currentOrders")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </sub>
              </sub>
              &nbsp;&nbsp;Current Orders
            </NavLink>
          </div>
          <div className="sidebar-tab btn">
            <NavLink
              to="/Restaurant/orderHistory"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/Restaurant/orderHistory")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">history</span>
                </sub>
              </sub>
              &nbsp;&nbsp;Order History
            </NavLink>
          </div>
          <div className="sidebar-tab btn">
            <NavLink
              to="/Restaurant/review"
              className="btn"
              style={{ backgroundColor: "goldenrod" }}
              // onClick={() => setDefaultRoute("/Restaurant/reviews")}
            >
              <sub>
                <sub>
                  <span className="material-symbols-outlined">reviews</span>
                </sub>
              </sub>
              &nbsp;&nbsp;Ratings &#38; Reviews
            </NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="main-content"
          style={{ width: sidebarOpen ? "auto" : "100%" }}
        >
          <Routes>
            <Route path="/profile" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<IncomingOrders />} />
            <Route
              path="/Restaurant/currentOrders"
              element={<CurrentOrders />}
            />
            <Route path="/Restaurant/orderHistory" element={<OrderHistory />} />
            <Route path="/Restaurant/review" element={<Reviews />} />
            <Route path="/*" element={<Menu />} />
            <Route
              path="/Restaurant/createMenu"
              element={<CreateMenu onMenuAdd={onMenuAdd} />}
            />
            <Route
              path="/Restaurant/updateMenu/:itemId"
              element={<UpdateMenu />}
            />
            <Route
              path="/Restaurant/MenuTable"
              element={<MenuTable menu={menu} setMenu={setMenu} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
