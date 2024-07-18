import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const [rName, setrName] = useState("");
  const [rEmail, setrEmail] = useState("");
  const [rMobile, setrMobile] = useState("");
  const [rPassword, setrPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!rName) errors.rName = "Full Name is required.";
    if (!rEmail) {
      errors.rEmail = "Email is required.";
    } else if (
      /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,}$/.test(rEmail)
    ) {
      errors.rEmail = "Email address is invalid.";
    }
    if (!rMobile) {
      errors.rMobile = "Phone Number is required.";
    } else if (!/^[6-9]\d{9}$/.test(rMobile)) {
      errors.rMobile = "Phone number is invalid.";
    }
    if (!rPassword) {
      errors.rPassword = "Password is required.";
    } else if (rPassword.length < 8) {
      errors.rPassword = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(rPassword)) {
      errors.rPassword = "Password must contain at least one uppercase letter.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/Restaurant/register", {
          rName,
          rEmail,
          rMobile,
          rPassword,
        })
        .then((result) => {
          const { token } = result.data;
          localStorage.setItem("ownerToken", token); // Store the token in localStorage or a cookie
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
    }
  };

  return (
    <>
      <div className="backgrounddd">
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
                onChange={(e) => setrName(e.target.value)}
                required
              />
              {errors.rName && <p className="error">{errors.rName}</p>}
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
                onChange={(e) => setrEmail(e.target.value)}
                required
              />
              {errors.rEmail && <p className="error">{errors.rEmail}</p>}
            </div>
            <div className="inputarea">
              <label className="labels" htmlFor="mobile">
                Phone Number:
              </label>
              <input
                className="inputs"
                type="tel"
                id="mobile"
                value={rMobile}
                onChange={(e) => setrMobile(e.target.value)}
                required
              />
              {errors.rMobile && <p className="error">{errors.rMobile}</p>}
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
                onChange={(e) => setrPassword(e.target.value)}
                required
              />
              {errors.rPassword && <p className="error">{errors.rPassword}</p>}
            </div>
            <div className="btnarea">
              <button className="btn btn-dark" type="submit">
                Register
              </button>
              <p>
                Already a user?{" "}
                <NavLink to="/Restaurant/login">Login Now</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
