// src/components/RestaurantList.js
import React, { useState } from 'react';
import './RestaurantList.css';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Restaurant A', email: 'a@example.com', image: 'https://via.placeholder.com/50', address: '123 A St', rating: 4.5, status: 'Approved', contact: '123-456-7890', menu: [{ name: 'Pizza', cuisine: 'Italian', status: 'Available' }, { name: 'Pasta', cuisine: 'Italian', status: 'Unavailable' }] },
    { id: 2, name: 'Restaurant B', email: 'b@example.com', image: 'https://via.placeholder.com/50', address: '456 B St', rating: 3.5, status: 'Pending', contact: '234-567-8901', menu: [{ name: 'Burger', cuisine: 'American', status: 'Available' }, { name: 'Fries', cuisine: 'American', status: 'Available' }] },
    { id: 3, name: 'Restaurant C', email: 'c@example.com', image: 'https://via.placeholder.com/50', address: '789 C St', rating: 4.0, status: 'Failed', contact: '345-678-9012', menu: [{ name: 'Sushi', cuisine: 'Japanese', status: 'Unavailable' }, { name: 'Rolls', cuisine: 'Japanese', status: 'Available' }] },
    // Add more sample restaurants here
  ]);

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    email: '',
    image: '',
    address: '',
    rating: '',
    status: '',
    contact: '',
  });
  const [statusFilter, setStatusFilter] = useState('All');
  const [menuVisible, setMenuVisible] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuEdit, setMenuEdit] = useState({ id: null, index: null, menuName: '', cuisineName: '', menuStatus: '' });

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterRestaurants(status, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterRestaurants(statusFilter, query);
  };

  const filterRestaurants = (status, query) => {
    setFilteredRestaurants(
      restaurants.filter(
        (restaurant) =>
          (status === 'All' || restaurant.status === status) &&
          restaurant.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleAddRestaurant = () => {
    if (newRestaurant.name && newRestaurant.email) {
      const updatedRestaurants = [
        ...restaurants,
        { ...newRestaurant, id: restaurants.length + 1, menu: [] },
      ];
      setRestaurants(updatedRestaurants);
      filterRestaurants(statusFilter, searchQuery);
      setNewRestaurant({
        name: '',
        email: '',
        image: '',
        address: '',
        rating: '',
        status: '',
        contact: '',
      });
      document.getElementById('add-restaurant-form').style.display = 'none';
    }
  };

  const handleRemoveRestaurant = (id) => {
    const updatedRestaurants = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    setRestaurants(updatedRestaurants);
    filterRestaurants(statusFilter, searchQuery);
  };

  const toggleMenu = (id) => {
    setMenuVisible(menuVisible === id ? null : id);
  };

  const addMenuItem = (restaurantId, item) => {
    if (item) {
      setRestaurants(
        restaurants.map((restaurant) => {
          if (restaurant.id === restaurantId) {
            return { ...restaurant, menu: [...restaurant.menu, item] };
          }
          return restaurant;
        })
      );
    }
  };

  const deleteMenuItem = (restaurantId, itemIndex) => {
    setRestaurants(
      restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          const newMenu = restaurant.menu.filter((_, index) => index !== itemIndex);
          return { ...restaurant, menu: newMenu };
        }
        return restaurant;
      })
    );
  };

  const handleEditMenuItem = (restaurantId, index) => {
    const menuItem = restaurants.find((r) => r.id === restaurantId).menu[index];
    setMenuEdit({ id: restaurantId, index, menuName: menuItem.name, cuisineName: menuItem.cuisine, menuStatus: menuItem.status });
  };

  const saveMenuItem = () => {
    setRestaurants(
      restaurants.map((restaurant) => {
        if (restaurant.id === menuEdit.id) {
          const updatedMenu = restaurant.menu.map((item, index) =>
            index === menuEdit.index
              ? { ...item, name: menuEdit.menuName, cuisine: menuEdit.cuisineName, status: menuEdit.menuStatus }
              : item
          );
          return { ...restaurant, menu: updatedMenu };
        }
        return restaurant;
      })
    );
    setMenuEdit({ id: null, index: null, menuName: '', cuisineName: '', menuStatus: '' });
  };

  return (
    <div className="restaurant-list">
      <div className="header">
        <button className="add-restaurant-button" onClick={() => document.getElementById('add-restaurant-form').style.display = 'block'}>
          Add Restaurant
        </button>
        <input
          type="text"
          placeholder="Search Restaurants"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div id="add-restaurant-form" className="add-restaurant-form">
        <input type="text" placeholder="Name" value={newRestaurant.name} onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newRestaurant.email} onChange={(e) => setNewRestaurant({ ...newRestaurant, email: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newRestaurant.image} onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })} />
        <input type="text" placeholder="Address" value={newRestaurant.address} onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })} />
        <input type="number" placeholder="Rating" value={newRestaurant.rating} onChange={(e) => setNewRestaurant({ ...newRestaurant, rating: e.target.value })} />
        <select value={newRestaurant.status} onChange={(e) => setNewRestaurant({ ...newRestaurant, status: e.target.value })}>
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input type="text" placeholder="Contact" value={newRestaurant.contact} onChange={(e) => setNewRestaurant({ ...newRestaurant, contact: e.target.value })} />
        <button onClick={handleAddRestaurant}>Add</button>
        <button onClick={() => document.getElementById('add-restaurant-form').style.display = 'none'}>Cancel</button>
      </div>

      <div className="filter-container">
        <select onChange={handleFilterChange} value={statusFilter}>
          <option value="All">All Statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <table className="restaurant-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Contact Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRestaurants.map((restaurant, index) => (
            <React.Fragment key={restaurant.id}>
              <tr>
                <td>{index + 1}</td>
                <td>{restaurant.name}</td>
                <td>{restaurant.email}</td>
                <td><img src={restaurant.image} alt={restaurant.name} className="restaurant-image" /></td>
                <td>{restaurant.address}</td>
                <td>{restaurant.rating}</td>
                <td>{restaurant.status}</td>
                <td>{restaurant.contact}</td>
                <td>
                  <button onClick={() => toggleMenu(restaurant.id)}>Menu</button>
                  <button onClick={() => handleRemoveRestaurant(restaurant.id)}>Remove</button>
                </td>
              </tr>
              {menuVisible === restaurant.id && (
                <tr>
                  <td colSpan="9">
                    <div className="menu-container">
                      <table>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Menu Name</th>
                            <th>Cuisine</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {restaurant.menu.map((menuItem, menuIndex) => (
                            <tr key={menuIndex}>
                              <td>{menuIndex + 1}</td>
                              <td>{menuItem.name}</td>
                              <td>{menuItem.cuisine}</td>
                              <td>
                                <select
                                  value={menuItem.status}
                                  onChange={(e) => {
                                    const updatedMenu = restaurant.menu.map((item, idx) =>
                                      idx === menuIndex ? { ...item, status: e.target.value } : item
                                    );
                                    setRestaurants(restaurants.map((rest) =>
                                      rest.id === restaurant.id ? { ...rest, menu: updatedMenu } : rest
                                    ));
                                  }}
                                >
                                  <option value="Available">Available</option>
                                  <option value="Unavailable">Unavailable</option>
                                </select>
                              </td>
                              <td>
                                <button onClick={() => handleEditMenuItem(restaurant.id, menuIndex)}>Edit</button>
                                <button onClick={() => deleteMenuItem(restaurant.id, menuIndex)}>Remove</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button onClick={() => addMenuItem(restaurant.id, { name: 'New Item', cuisine: 'New Cuisine', status: 'Available' })}>
                        Add Menu Item
                      </button>
                      {menuEdit.id === restaurant.id && menuEdit.index !== null && (
                        <div>
                          <input
                            type="text"
                            placeholder="Menu Name"
                            value={menuEdit.menuName}
                            onChange={(e) => setMenuEdit({ ...menuEdit, menuName: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Cuisine Name"
                            value={menuEdit.cuisineName}
                            onChange={(e) => setMenuEdit({ ...menuEdit, cuisineName: e.target.value })}
                          />
                          <select
                            value={menuEdit.menuStatus}
                            onChange={(e) => setMenuEdit({ ...menuEdit, menuStatus: e.target.value })}
                          >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                          </select>
                          <button onClick={saveMenuItem}>Save</button>
                          <button onClick={() => setMenuEdit({ id: null, index: null, menuName: '', cuisineName: '', menuStatus: '' })}>Cancel</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
