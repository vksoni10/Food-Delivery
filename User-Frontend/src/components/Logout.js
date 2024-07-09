import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    
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
