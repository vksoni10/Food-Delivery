import React from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <>
    <nav className="navbar">
        <NavLink to='/' className="logo">
            <img src="./Images/1.jpg" alt="" />
            <h2>TastyTrack</h2>
        </NavLink>
        <div className="buttons">
            <NavLink to='/auth/login' className="navbutton"><p>Login</p></NavLink>
            <NavLink to='/auth/register' className="navbutton"><p>Register</p></NavLink>
        </div>
    </nav>
    </>
  )
}

export default Navbar