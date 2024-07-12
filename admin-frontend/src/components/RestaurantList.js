import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/restaurantslist');
        setRestaurants(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching restaurants');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/admin/deleteRestaurant/${id}`)
      .then(res => {
        console.log(res);
        setRestaurants(restaurants.filter(restaurant => restaurant._id !== id));
      })
      .catch(err => console.log(err));
  };
  
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.resName && restaurant.resName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-list">
      <h1>Restaurant List</h1>
      <div className="search-bars-container">
        <div className="search-bars">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Operational Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRestaurants.map((restaurant) => (
              <tr key={restaurant._id}>
                <td>{restaurant.resName || 'N/A'}</td>
                <td>{restaurant.resAddress || 'N/A'}</td>
                <td>{restaurant.resNumber || 'N/A'}</td>
                <td>{restaurant.resOperationalHours || 'N/A'}</td>
                <td>
                  <button className='delete-button'>Delete</button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantList;
