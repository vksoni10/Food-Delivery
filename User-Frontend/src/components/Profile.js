import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './Profile.css';
import Navbar from './Navbar';

function Profile() {
    const [user, setUser] = useState({});
    const [newAddress, setNewAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingAddress, setEditingAddress] = useState('');

    // Function to fetch user profile and addresses
    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const { name, email, mobile, addresses } = decoded;
                setUser({ name, email, mobile });
                setAddresses(addresses || []);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.post('http://localhost:3001/auth/add-address', { address: newAddress }, config);
                setAddresses(response.data.addresses || []);
                setNewAddress('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditClick = (index, address) => {
        setEditingIndex(index);
        setEditingAddress(address);
    };

    const handleEditChange = (e) => {
        setEditingAddress(e.target.value);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.put(`http://localhost:3001/auth/edit-address/${editingIndex}`, { address: editingAddress }, config);
                setAddresses(response.data.addresses || []);
                setEditingIndex(null);
                setEditingAddress('');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteClick = async (index) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.delete(`http://localhost:3001/auth/delete-address/${index}`, config);
                setAddresses(response.data.addresses || []);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile">
                <h1>User Profile</h1>
                <div className="profile-details">
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Name:</strong></td>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Mobile:</strong></td>
                                <td>{user.mobile}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="profile-addresses">
                    <h2>Saved Addresses</h2>
                    <ul>
                        {addresses.map((address, index) => (
                            <li key={index}>
                                {editingIndex === index ? (
                                    <form onSubmit={handleEditSubmit}>
                                        <input
                                            type="text"
                                            value={editingAddress}
                                            onChange={handleEditChange}
                                            required
                                        />
                                        <button type="submit">Save</button>
                                    </form>
                                ) : (
                                    <>
                                        {address}
                                        <button onClick={() => handleEditClick(index, address)}>Edit</button>
                                        <button onClick={() => handleDeleteClick(index)}>Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="add-address">
                    <h2>Add New Address</h2>
                    <form onSubmit={handleAddAddress}>
                        <input
                            type="text"
                            value={newAddress}
                            onChange={handleAddressChange}
                            placeholder="Enter new address"
                            required
                        />
                        <button type="submit">Add Address</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Profile;
