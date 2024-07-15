import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestoCard.css';

const RestoCard = ({ id, image, name, cuisine, price, rating, discount, opensAt, distance }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  // Round the price to the nearest 0.5
  const roundedPrice = (Math.round(price * 2) / 2).toFixed(2);
  const rounderRating = (Math.round(rating * 2) / 2).toFixed(2);

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
        <p className="resto-price">Average Price: ₹{roundedPrice}</p>
        <div className="resto-info">
          <span className="resto-rating">Rating: {rounderRating}</span>
          <span className="resto-opens">Timings: {opensAt}</span>
        </div>
      </div>
    </div>
  );
};

export default RestoCard;
