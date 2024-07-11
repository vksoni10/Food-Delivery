// src/RestroDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RestroDetail.css';
import Navbar from './Navbar';
import Review from './Review';
import Comment from './Comment';
import ShareButton from './ShareButton';
import axios from 'axios';

const RestroDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [booking, setBooking] = useState({ people: '', time: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Restaurant/${id}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    fetchRestaurantDetails();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setBookingSuccess(false);
  };

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="restro-detail">
        <div className="image-section">
          <img
            src={restaurant.resImage[0]}
            alt={restaurant.resName}
            className="main-image"
          />
          <div className="gallery">
            {restaurant.resImage.slice(1).map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt="Gallery" />
              </div>
            ))}
            <span className="view">View Gallery</span>
          </div>
        </div>

        <div className="details-section">
          <h1>{restaurant.resName}</h1>
          <p>{restaurant.cuisine}</p>
          <p>{restaurant.resAddress}</p>
          <p className="status">{restaurant.resOperationalHours}</p>
          <div className="actions">
            <button className="hello">
              <a className="hello" target="_main" href={`https://www.google.com/maps/place/${restaurant.resName}`}>
                Directions
              </a>
            </button>
            <button className="hello">Menu</button>
            <button className="heh">
              <ShareButton className="mt-5" />
            </button>
          </div>
          <div className="ratings">
            <div className="rating-item">
              <span className="rating-value ta">{restaurant.rating}</span>
              <p className='display-6'>Rating</p>
            </div>
          </div>
          <div className="tabs">
            <span
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('overview')}
            >
              Overview
            </span>
            <span
              className={`tab ${activeTab === 'order' ? 'active' : ''}`}
              onClick={() => handleTabClick('order')}
            >
              Order Online
            </span>
            <span
              className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => handleTabClick('reviews')}
            >
              Reviews
            </span>
            <span
              className={`tab ${activeTab === 'book' ? 'active' : ''}`}
              onClick={() => handleTabClick('book')}
            >
              Book a Table
            </span>
          </div>
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div id="overview">
                <h2 className="h">About this place</h2>
                <p>{restaurant.description}</p>
              </div>
            )}
            {activeTab === 'order' && (
              <div id="order">
                <h2 className="h">Menu</h2>
                <ul>
                  {restaurant.menu.map(item => (
                    <li key={item._id}>
                      {item.dishName} - ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div id="reviews">
                <h2 className="h">Reviews</h2>
                <Review reviews={restaurant.resReview} />
              </div>
            )}
            {activeTab === 'book' && (
              <div id="book">
                <h2 className="h">Book a Table</h2>
                {bookingSuccess ? (
                  <div className="booking-success">
                    <span>&#10004;</span> Booked successfully!
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <label className="h">
                      Table for:
                      <input
                        type="number"
                        name="people"
                        value={booking.people}
                        onChange={handleBookingChange}
                        required
                      />
                    </label>
                    <label className="h">
                      Time:
                      <input
                        type="time"
                        name="time"
                        value={booking.time}
                        onChange={handleBookingChange}
                        required
                      />
                    </label>
                    <button type="submit">Book Now</button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestroDetail;
