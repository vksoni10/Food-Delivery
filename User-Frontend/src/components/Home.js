import React from "react";
import './Home.css';
import './Login.css'
import bg from "../front.avif";
import bg1 from "../components/logo1.jpg"
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
    <div className="home">

      <div className="content">
        <h1>POTATO</h1>
        <h4>Discover the best food and drinks in your area</h4>
        <NavLink className="button" to='/auth/restaurants'>Order Now</NavLink>
      </div>
    </div>
    </>
  );
}
