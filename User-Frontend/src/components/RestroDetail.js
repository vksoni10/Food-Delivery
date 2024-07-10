import React, { useEffect,useState } from 'react';
import './RestroDetail.css';
import Navbar from './Navbar';
import Review from './Review';
import ShareButton from './ShareButton';
import axios from 'axios'

const RestroDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [booking, setBooking] = useState({ people: '' , time :''}); // State for booking details
  const [bookingSuccess, setBookingSuccess] = useState(false); // State for booking success message
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
      axios.get()
          .then(response => response.json())
          .then(data => setMenuItems(data))
          .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setBookingSuccess(false); 
  };

  const handleBookingChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Add your booking submission logic here
    
    setBookingSuccess(true); // Show booking success message
  };


  return (
    <>
      <Navbar />
      <div className="restro-detail">
        <div className="image-section">
          <img
            src="https://b.zmtcdn.com/data/pictures/9/20880979/94b338b94113e821cac2f6f8f8de4fb2_featured_v2.jpg?output-format=webp"
            alt="Bonkey's Pizza"
            className="main-image"
          />
          <div className="gallery">
            <div className="gallery-item">
              <img
                src="https://b.zmtcdn.com/data/pictures/6/21262656/ec1feb6624545f6abf98f0e2fe7ea6d8_featured_v2.jpg?output-format=webp"
                alt="Gallery"
              />
              <img
                src="https://b.zmtcdn.com/data/pictures/6/21262656/ec1feb6624545f6abf98f0e2fe7ea6d8_featured_v2.jpg?output-format=webp"
                alt="Gallery"
              />
              <span className='view'>View Gallery</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h1>Bonkey's Pizza</h1>
          <p>Pizza</p>
          <p>Civil Lines, Jaipur</p>
          <p className="status">Open now - 1pm - 11pm (Today)</p>
          <div className="actions">
            <button className='hello'>
              <a className='hello' target='_main' href='https://www.google.com/maps/place/Bonkey'>Directions</a>
            </button>
            <button className='hello'>Menu</button>
            <button className='heh'><ShareButton className='mt-5' /></button>
          </div>
          <div className="ratings">
            <div className="rating-item">
              <span className='rating-value ta'>14</span>
              <p>Dining Ratings</p>
            </div>
            <div className="rating-item">
              <span className="rating-value ta">4.0</span>
              <p>Delivery Ratings</p>
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
                <h2 className='h'>About this place</h2>
                <p>Overview content...</p>
              </div>
            )}
            {activeTab === 'order' && (
              <div id="order">
                <h2 className='h'>Menu</h2>
                <div>
            
            <ul>
                {menuItems.map(item => (
                    <li key={item._id}>
                        {item.name} - ${item.price}
                        {/* Add 'Add to Cart' button here */}
                    </li>
                ))}
            </ul>
        </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div id="reviews">
                <h2 className='h'>Reviews</h2>
                <Review/>
              </div>
            )}
            {activeTab === 'book' && (  
              <div id="book">
                <h2 className='h'>Book a Table</h2>
                {bookingSuccess ? (
                <div className="booking-success">
                  <span>&#10004;</span> Booked successfully!
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                <label className = 'h' >
                  Table for:
                  <input
                    type="number"
                    name="people"
                    value={booking.people}
                    onChange={handleBookingChange}
                    required
                  />
                </label>
                <label className='h'>
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
