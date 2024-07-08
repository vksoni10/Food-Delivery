import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage or any other storage method
    localStorage.removeItem('token');
    // Optionally, you can make an API call to the server to invalidate the token
    // axios.post('http://localhost:3001/auth/logout').then(() => {
    //   navigate('/auth/login');
    // }).catch(err => {
    //   console.error(err);
    // });
    navigate('/auth/login');
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className='logout'>
        <h1>Logging out...</h1>
      </div>
    </>
  );
}
