import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rMobile, setRMobile] = useState("");
  const [rPassword, setRPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/Restaurant/register", {
        rName,
        rEmail,
        rMobile,
        rPassword,
      })
      .then((result) => {
        console.log(result);
        navigate("/Restaurant/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };
  return (
    <>
      <div className="reg">
        <form onSubmit={handleSubmit} className="formarea">
          <h1>Register</h1>
          <div className="inputarea">
            <label className="labels" htmlFor="name">
              Full Name:
            </label>
            <input
              className="inputs"
              type="text"
              id="name"
              value={rName}
              onChange={(e) => setRName(e.target.value)}
              required
            />
          </div>
          <div className="inputarea">
            <label className="labels" htmlFor="email">
              Email:
            </label>
            <input
              className="inputs"
              type="email"
              id="email"
              value={rEmail}
              onChange={(e) => setREmail(e.target.value)}
              required
            />
          </div>
          <div className="inputarea">
            <label className="labels" htmlFor="mobile">
              Phone Number:
            </label>
            <input
              className="inputs"
              type="number"
              id="mobile"
              value={rMobile}
              onChange={(e) => setRMobile(e.target.value)}
              required
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
              value={rPassword}
              onChange={(e) => setRPassword(e.target.value)}
              required
            />
          </div>
          <div className="btnarea">
            <button className="btn" type="submit">
              Register
            </button>
            <p>
              Already a user?{" "}
              <NavLink to="/Restaurant/login">Login Now</NavLink>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
