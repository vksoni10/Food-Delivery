import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import './Profile.css';
import Navbar from './Navbar';

function Profile() {
    const [user, setUser] = useState({});
    const [newAddress, setNewAddress] = useState('');
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
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
        fetchUserProfile(); // Initial fetch when component mounts
    }, []);

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value);
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const response = await axios.post('http://localhost:3001/auth/add-address', { address: newAddress }, config);
                setAddresses([...addresses, newAddress]);
                setNewAddress('');
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
                            <li key={index}>{address}</li>
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
