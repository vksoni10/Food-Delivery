// src/RestoCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestoCard.css';

const RestoCard = ({ id, image, name, cuisine, price, rating, discount, opensAt, distance }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="resto-card" onClick={handleClick}>
      <div
        className="resto-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        {discount && <div className="resto-discount">{discount}</div>}
      </div>
      <div className="resto-details">
        <h3 className="resto-name">{name}</h3>
        <p className="resto-cuisine">{cuisine}</p>
        <p className="resto-price">Average Price: ${price}</p>
        <div className="resto-info">
          <span className="resto-rating">Rating: {rating}</span>
          <span className="resto-opens">{opensAt}</span>
          <span className="resto-distance">Distance: {distance} meters</span>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
