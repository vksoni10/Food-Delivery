import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [aEmail, setaEmail] = useState("");
  const [aPassword, setaPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Admins/login", { aEmail, aPassword })
      .then((res) => {
        const { message, token } = res.data;
        if (message === "Login successful" && token) {
          localStorage.setItem("ownerToken", token);
          onLogin();
          navigate("/dashboard");
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
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setaEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setaPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-login" type="submit">
          Login
        </button>
        <p className="register-link">
          First time on our website?{" "}
          <NavLink to="/">Register Now</NavLink>
        </p>
      </form>
    </div>
  );
}