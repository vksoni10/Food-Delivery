import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestroDetail.css';
import Navbar from './Navbar';
import Review from './Review';
import Comment from './Comment';
import ShareButton from './ShareButton';
import axios from 'axios';
import Order from './Order';  // Import the Order component

const RestroDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [booking, setBooking] = useState({ people: '', time: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

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

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (item, quantity) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const handleMenuClick = () => {
    setActiveTab("order"); // Set active tab to "order"
  
    // Use setTimeout to ensure the tab state updates before scrolling
    setTimeout(() => {
      document.getElementById('menuss').scrollIntoView({ behavior: 'smooth' });
    }, 0); // Delay to ensure the state update takes effect
  };
  
  
  

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
              <a
                className="hello"
                target="_main"
                href={`https://www.google.com/maps/place/${restaurant.resName}`}
              >
                Directions
              </a>
            </button>
            <button className="hello" onClick={handleMenuClick}>
  Menu
</button>

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
            <span id='menuss'
              className={`tab ${activeTab === "order" ? "active" : ""}`}
              onClick={() => handleTabClick("order")}
            >
              Order Online
            </span>
            <span
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </span>
            <span
              className={`tab ${activeTab === "book" ? "active" : ""}`}
              onClick={() => handleTabClick("book")}
            >
              Book a Table
            </span>
          </div>
          <div className="tab-content">
            {activeTab === "overview" && (
              <div id="overview">
                <h4 className="h">Order now from {restaurant.resName}.<br></br>The best place in town to have {restaurant.restaurantTypes}. <br></br> Visit us now at {restaurant.resAddress}. <br></br> Checkout the above tabs to explore ordering online, the reviews our customers gave and also to book a table! </h4>
              </div>
            )}
            {activeTab === "order" && (
              <Order 
                restaurant={restaurant} 
                cart={cart} 
                handleAddToCart={handleAddToCart} 
                handleUpdateQuantity={handleUpdateQuantity} 
              />
            )}
            {activeTab === "reviews" && (
              <div id="reviews">
                <h2 className="h">Reviews</h2>
                <Review reviews={restaurant.resReview} />
              </div>
            )}
            {activeTab === "book" && (
              <div id="book">
  <h2 className="h">Book a Table</h2>
  {bookingSuccess ? (
    <div className="booking-success">
      <span>&#10004;</span> Booked successfully!
    </div>
  ) : (
    <div className='booking'>
      <form onSubmit={handleBookingSubmit}>
        <label className="form-label">
          <h5 className="text">Table for</h5>
          <input
            type="number"
            name="people"
            value={booking.people}
            onChange={handleBookingChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          <h5 className="text">Date:</h5>
          <input
            type="date"
            name="date"
            value={booking.date}
            onChange={handleBookingChange}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          <h5 className="text">Time:</h5>
          <input
            type="time"
            name="time"
            value={booking.time}
            onChange={handleBookingChange}
            required
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Book Now
        </button>
      </form>
    </div>
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
