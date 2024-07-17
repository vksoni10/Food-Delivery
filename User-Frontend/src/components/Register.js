import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import NavBar from './Navbar'
import Navbar from './Navbar';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validateMobile(mobile)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    alert('Registration successful!');
    



    axios.post('http://localhost:3001/auth/register', { name, email, mobile, password })
      .then(result => {
        console.log(result);
        navigate('/auth/login');
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          console.log(err);
        }
      });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
    
  };

  const validateMobile = (mobile) => {
    const regex = /^[6-9][0-9]{9}$/;
    return regex.test(mobile);
    
  };







  return (<>
      <Navbar/>
    <div className='login'>
      <form onSubmit={handleSubmit} className='formarea'>
        <h1>Register</h1>
        <div className="inputarea">
          <label className='labels' htmlFor="name">Full Name:</label>
          <input className='inputs' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="inputarea">
          <label className='labels' htmlFor="email">Email:</label>
          <input className='inputs' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="inputarea">
          <label className='labels' htmlFor="mobile">Phone Number:</label>
          <input className='inputs' type="number" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        <div className="inputarea">
          <label className='labels' htmlFor="password">Password:</label>
          <input className='inputs' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="btnarea">
          <button className='bttn'  type="submit">Register</button>
          <p>Already a user? <NavLink to='/auth/login'>Login Now</NavLink></p>
        </div>
      </form>
    </div>
    </>
  );
}
