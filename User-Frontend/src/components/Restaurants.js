import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestoCard from './RestoCard';
import './Restaurants.css';
import Navbar from './Navbar';

const Restaurants = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Restaurant/restaurants');
        setRestaurantData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRestaurants();
  }, []);

  const calculateAveragePrice = (menu) => {
    if (menu.length === 0) return 0;
    const total = menu.reduce((total, item) => total + item.price, 0);
    return total / menu.length;
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((total, review) => total + review.rating, 0);
    return total / reviews.length;
  };

  return (
    <>
      <Navbar />
      <div className='restro'>
        <div className="restaurant-list">
          {restaurantData.map((resto, index) => (
            <RestoCard
              key={index}
              id={resto._id}
              image={resto.resImage[0]}
              name={resto.resName}
              cuisine={resto.restaurantTypes}
              price={calculateAveragePrice(resto.menu)}
              rating={calculateAverageRating(resto.resReview)} // Calculate average rating
              discount={resto.resDiscount}
              opensAt={resto.resOperationalHours}
              distance={"Not available"}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
