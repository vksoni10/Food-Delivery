import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/Restaurant/login", { rEmail, rPassword })
      .then((res) => {
        if (res.data === "Success") {
          window.location.href = "/";
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
    <div className="login">
      <form onSubmit={handleLogin} className="formarea">
        <h1>Login</h1>
        <div className="inputarea">
          <label className="labels" htmlFor="email">
            Email:
          </label>
          <input
            className="inputs"
            type="email"
            id="email"
            onChange={(e) => setREmail(e.target.value)}
          />
        </div>
        <div className="inputarea">
          <label className="labels" htmlFor="password">
            Password:
          </label>
          <input
            className="inputs"
            type="password"
            id="password"
            onChange={(e) => setRPassword(e.target.value)}
          />
        </div>
        <div className="btnarea">
          <button className="btn" type="submit">
            Login
          </button>
          <p>
            First time on our website?{" "}
            <NavLink to="/Restaurant/register">Register Now</NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
