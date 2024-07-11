import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PromocodeList.css';

const PromocodeList = () => {
  const [promocodes, setPromocodes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPromocodes = async () => {
      const response = await axios.get('/api/promocodes');
      setPromocodes(response.data);
    };

    fetchPromocodes();
  }, []);

  const filteredPromocodes = promocodes.filter(promocode =>
    promocode.promocode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="promocode-list">
      <div className="header">
        <h1>Promocodes List</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search Promocodes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/add-promocode" className="add-promocode-button">
            ADD PROMOCODE
          </Link>
        </div>
      </div>
      <table className="promocode-table">
        <thead>
          <tr>
            <th>No</th>
            <th>PROMOCODE</th>
            <th>Discount Type</th>
            <th>Discount</th>
            <th>Expiration</th>
            <th>Usage Limit</th>
            <th>No of Used</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPromocodes.map((promocode, index) => (
            <tr key={promocode._id}>
              <td>{index + 1}</td>
              <td>{promocode.promocode}</td>
              <td>{promocode.discountType}</td>
              <td>{promocode.discount}</td>
              <td>{promocode.expiration}</td>
              <td>{promocode.usageLimit}</td>
              <td>{promocode.noOfUsed}</td>
              <td>
                <select
                  value={promocode.status}
                  onChange={(e) => handleStatusChange(promocode._id, e.target.value)}
                >
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEdit(promocode._id)}>Edit</button>
                <button onClick={() => handleRemove(promocode._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  async function handleStatusChange(id, status) {
    await axios.put(`/api/promocodes/${id}/status`, { status });
    setPromocodes(promocodes.map(p => (p._id === id ? { ...p, status } : p)));
  }

  async function handleEdit(id) {
    // handle edit logic
  }

  async function handleRemove(id) {
    await axios.delete(`/api/promocodes/${id}`);
    setPromocodes(promocodes.filter(p => p._id !== id));
  }
};

export default PromocodeList;
