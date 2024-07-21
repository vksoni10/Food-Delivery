import React, { useState } from "react";
import axios from "axios";
import "./ViewRestaurant.css";
import { NavLink } from "react-router-dom";

export default function ViewRestaurant() {
  const [resName, setResName] = useState("");
  //const [rPassword, setrPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Restaurant/restlogin", { resName })
      .then((res) => {
        const { message, token } = res.data; // Destructure token and message from response data
        if ((message == "Login successful", token)) {
          localStorage.setItem("token", token); // Store the token in localStorage or a cookie
          window.location.href = "/Restaurant/restaurantHome";
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <div className="backgrounddddd">
      <div className="resLogin">
        <form onSubmit={handleLogin} className="formarea">
          <h1>Login</h1>
          <div className="inputarea">
            <label className="labels" htmlFor="email">
              RestaurantName:
            </label>
            <input
              className="inputs"
              type="text"
              id="name"
              onChange={(e) => setResName(e.target.value)}
            />
          </div>

          <div className="btnarea">
            <button className="btn btn-dark" type="submit">
              Login
            </button>
            <p>
              Don't Have a Restaurant?{" "}
              <NavLink to="/Restaurant/addRestaurant">Register Now</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
