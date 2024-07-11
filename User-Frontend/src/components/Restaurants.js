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

  return (
    <>
      <Navbar />
      <div className='restro'>
        <div className="restaurant-list">
          {restaurantData.map((resto) => (
            <RestoCard
              key={resto._id}
              id={resto._id}
              image={resto.resImage[0]}
              name={resto.resName}
              cuisine={resto.restaurantTypes.join(', ')}
              price={resto.menu.reduce((total, item) => total + item.price, 0) / resto.menu.length}
              rating={resto.rating}
              discount={resto.resDiscount}
              opensAt={resto.resOperationalHours}
              distance={"Not available"} // Assuming you don't have distance data in the model
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
