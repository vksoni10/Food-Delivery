import React from 'react';
import './RestroDetail.css';
import Navbar from './Navbar';

const RestroDetail = () => {
  return (
    <>
    <Navbar/>
    <div className="restro-detail">
      <div className="image-section">
        <img src="https://b.zmtcdn.com/data/pictures/9/20880979/94b338b94113e821cac2f6f8f8de4fb2_featured_v2.jpg?output-format=webp" alt="Bonkey's Pizza" className="main-image" />
        <div className="gallery">
          <div className="gallery-item">
            <img src="https://b.zmtcdn.com/data/pictures/6/21262656/ec1feb6624545f6abf98f0e2fe7ea6d8_featured_v2.jpg?output-format=webp" alt="Gallery" />
            <img src="https://b.zmtcdn.com/data/pictures/6/21262656/ec1feb6624545f6abf98f0e2fe7ea6d8_featured_v2.jpg?output-format=webp" alt="Gallery" />
            <span>View Gallery</span>
          </div>
        </div>
      </div>
      <div className="details-section">
        <h1>Bonkey's Pizza</h1>
        <p>Pizza</p>
        <p>Civil Lines, Jaipur</p>
        <p className="status">Open now - 1pm - 11pm (Today)</p>
        <div className="actions">
          <a className='hello' target='_main' href='https://www.google.com/maps/place/Bonkey'>Direction</a>
          <button className='hello'>Menu</button>
          <button><span className="material-symbols-outlined share">
share
</span>
</button>
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
          <span className="tab active">Overview</span>
          <span className="tab">Order Online</span>
          <span className="tab">Reviews</span>
          <span className="tab">Photos</span>
          <span className="tab">Book a Table</span>
        </div>
        <div className="about">
          <h2 className='tab'>About this place</h2>
        </div>
      </div>
    </div></>
  );
};

export default RestroDetail;
