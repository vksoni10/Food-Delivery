import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./final.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <header
        className="navbar navbar-dark bg-light"
        style={{ backgroundColor: "#000000" }}
      >
        <NavLink to="/" className="">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
        <div className="nav-link">
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
        </div>
      </header>
    </>
  );
}
