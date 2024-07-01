import React, { useState } from 'react'
import './Login.css'
import axios from 'axios';

export default function Login() {

const [email,setEmail]= useState();
const [password,setPassword]=useState();

axios.default.withCredentials=true;
const handleLogin=(e)=>{
  e.preventDefault();
  axios.post('http://localhost:3001/auth/login', {email,password})
  .then(res=>{
    if(res.data=='Success'){
      window.location.href="/";
    }
    else{
      alert("invalid credentials");
    }
  })
  .catch(err=> console.log(err))
};

  return (
    <div className='login'>
      <form onSubmit={handleLogin} className='formarea'>
        <h1>Login</h1>
        <div className="inputarea">   
          <label className='labels' htmlFor="email">Email:</label>
          <input className='inputs' type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputarea">   
          <label className='labels' htmlFor="password">Password:</label>
          <input className='inputs' type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="btnarea">
          <button className='btn' type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
