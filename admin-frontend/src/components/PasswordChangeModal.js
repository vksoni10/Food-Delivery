// src/components/PasswordChangeModal.js
import React, { useState } from 'react';
import './PasswordChangeModal.css';

const PasswordChangeModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle password change
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    console.log('Confirm New Password:', confirmNewPassword);
    // Close the modal after submitting 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              value={confirmNewPassword} 
              onChange={(e) => setConfirmNewPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">Change Password</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
