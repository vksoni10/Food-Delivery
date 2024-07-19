import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [aName, setaName] = useState("");
  const [aEmail, setaEmail] = useState("");
  const [aMobile, setaMobile] = useState("");
  const [aPassword, setaPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ownerToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validate = () => {
    const errors = {};
    if (!aName) errors.aName = "Full Name is required.";
    if (!aEmail) {
      errors.aEmail = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(aEmail)) {
      errors.aEmail = "Email address is invalid.";
    }
    if (!aMobile) {
      errors.aMobile = "Phone Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(aMobile)) {
      errors.aMobile = "Phone number is invalid.";
    }
    if (!aPassword) {
      errors.aPassword = "Password is required.";
    } else if (aPassword.length < 8) {
      errors.aPassword = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(aPassword)) {
      errors.aPassword = "Password must contain at least one uppercase letter.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/Admins/register", {
          aName,
          aEmail,
          aMobile,
          aPassword,
        })
        .then((result) => {
          console.log(result);
          navigate("/login");
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            alert(err.response.data.message);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h1>Register</h1>
        <div className="input-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={aName}
            onChange={(e) => setaName(e.target.value)}
            required
          />
          {errors.aName && <p className="error">{errors.aName}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={aEmail}
            onChange={(e) => setaEmail(e.target.value)}
            required
          />
          {errors.aEmail && <p className="error">{errors.aEmail}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Phone Number:</label>
          <input
            type="tel"
            id="mobile"
            value={aMobile}
            onChange={(e) => setaMobile(e.target.value)}
            required
          />
          {errors.aMobile && <p className="error">{errors.aMobile}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={aPassword}
            onChange={(e) => setaPassword(e.target.value)}
            required
          />
          {errors.aPassword && <p className="error">{errors.aPassword}</p>}
        </div>
        <button className="btn-register" type="submit">
          Register
        </button>
        <p className="login-link">
          Already a user? <NavLink to="/login">Login Now</NavLink>
        </p>
      </form>
    </div>
  );
}