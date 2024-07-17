import React, { useState } from 'react';
import './Header.css';
import logo from './final.png'; // Corrected path to the logo
import PasswordChangeModal from './PasswordChangeModal';

const Header = ({ onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="super-admin">
        <div className="dropdown">
          <button className="dropbtn">Admin</button>
          <div className="dropdown-content">
            <a href="#" onClick={handleOpenModal}>Change Password</a>
            <a href="#" onClick={handleLogout}>Logout</a>
          </div>
        </div>
      </div>
      <PasswordChangeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Header;
