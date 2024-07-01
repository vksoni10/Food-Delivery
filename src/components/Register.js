import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [name,setName]= useState();
  const [email, setEmail]= useState();
  const [mobile, setMobile]= useState();
  const [password, setPassword]= useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    axios.post('http://localhost:3001/auth/register', { name, email, mobile, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  

  return (
    <>
    <div className='reg'>
    <form onSubmit={handleSubmit} className='formarea'>
        <h1>Register</h1>
     <div className="inputarea">   
    <label className='labels' htmlFor="name">Full Name:</label>
    <input className='inputs' type="text" onChange={(e)=> setName(e.target.value)} />
    </div>
     <div className="inputarea">   
    <label  className='labels' htmlFor="email">Email:</label>
    <input className='inputs' type="email" onChange={(e)=>setEmail(e.target.value)} />
    </div>
     <div className="inputarea">   
    <label className='labels'  htmlFor="phone">Phone Number:</label>
    <input className='inputs' type="number" onChange={(e)=>setMobile(e.target.value)} />
    </div>
     <div className="inputarea">   
    <label className='labels'  htmlFor="password">Password:</label>
    <input className='inputs' type="password" onChange={(e)=>setPassword(e.target.value)} />
    </div>
    <div className="btnarea">
        <button className='btn'>Register</button>
    </div>
    </form>
    </div>
    </>
    )
}
