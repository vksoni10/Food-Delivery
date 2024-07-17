import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import './ProfilePage.css';

const RestaurantDashboard = () => {
  const [ownerDetails, setOwnerDetails] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const ownerToken = localStorage.getItem('ownerToken');
      const restaurantToken = localStorage.getItem('token');

      if (ownerToken && restaurantToken) {
        const decodedOwner = jwtDecode(ownerToken);
        const decodedRestaurant = jwtDecode(restaurantToken);

        try {
          const restaurantResponse = await axios.get(`http://localhost:3001/restaurants/${decodedRestaurant.resName}`);
          const ordersResponse = await axios.get(`http://localhost:3001/orders/${decodedRestaurant.resName}`);
if(ordersResponse == null){
  
}
          setOwnerDetails(decodedOwner);
          setRestaurantDetails(restaurantResponse.data);
          calculateTotalIncome(ordersResponse.data);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, []);

  const calculateTotalIncome = (orders) => {
    const income = orders.reduce((acc, order) => {
      return acc + order.items.reduce((itemAcc, item) => {
        return itemAcc + (item.individualPrice * item.quantity);
      }, 0);
    }, 0);
    setTotalIncome(income);
  };

  const handleOwnerUpdate = async () => {
    const { id } = ownerDetails;
    await axios.put(`http://localhost:3001/owners/${id}`, ownerDetails);
    setIsEditingOwner(false);
  };

  const handleRestaurantUpdate = async () => {
    const { resName } = restaurantDetails;
    await axios.put(`http://localhost:3001/restaurants/${resName}`, restaurantDetails);
    setIsEditingRestaurant(false);
  };

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>

      <section className="owner-details">
        <h2>Owner Details</h2>
        <div>
          <label>Name:</label>
          {isEditingOwner ? (
            <input
              type="text"
              value={ownerDetails.rName}
              onChange={(e) => setOwnerDetails({ ...ownerDetails, rName: e.target.value })}
            />
          ) : (
            <span>{ownerDetails.rName}</span>
          )}
        </div>
        <div>
          <label>Email:</label>
          {isEditingOwner ? (
            <input
              type="email"
              value={ownerDetails.rEmail}
              onChange={(e) => setOwnerDetails({ ...ownerDetails, rEmail: e.target.value })}
            />
          ) : (
            <span>{ownerDetails.rEmail}</span>
          )}
        </div>
        <div>
          <label>Phone No:</label>
          {isEditingOwner ? (
            <input
              type="text"
              value={ownerDetails.rMobile}
              onChange={(e) => setOwnerDetails({ ...ownerDetails, rMobile: e.target.value })}
            />
          ) : (
            <span>{ownerDetails.rMobile}</span>
          )}
        </div>
        <button onClick={isEditingOwner ? handleOwnerUpdate : () => setIsEditingOwner(true)}>
          {isEditingOwner ? 'Save' : 'Edit'}
        </button>
      </section>

      <section className="restaurant-details">
        <h2>Restaurant Details</h2>
        <div>
          <label>Name:</label>
          <span>{restaurantDetails.resName}</span>
        </div>
        <div>
          <label>Address:</label>
          <span>{restaurantDetails.resAddress}</span>
        </div>
        <div>
          <label>Phone No:</label>
          {isEditingRestaurant ? (
            <input
              type="text"
              value={restaurantDetails.resNumber}
              onChange={(e) => setRestaurantDetails({ ...restaurantDetails, resNumber: e.target.value })}
            />
          ) : (
            <span>{restaurantDetails.resNumber}</span>
          )}
        </div>
        <div>
          <label>Operational Hours:</label>
          {isEditingRestaurant ? (
            <input
              type="text"
              value={restaurantDetails.resOperationalHours}
              onChange={(e) => setRestaurantDetails({ ...restaurantDetails, resOperationalHours: e.target.value })}
            />
          ) : (
            <span>{restaurantDetails.resOperationalHours}</span>
          )}
        </div>
        <button onClick={isEditingRestaurant ? handleRestaurantUpdate : () => setIsEditingRestaurant(true)}>
          {isEditingRestaurant ? 'Save' : 'Edit'}
        </button>
      </section>

      <section className="total-income">
        <h2>Total Income</h2>
        <span>${totalIncome.toFixed(2)}</span>
      </section>
    </div>
  );
};

export default RestaurantDashboard;
