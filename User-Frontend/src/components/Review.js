import React, { useState } from 'react';
import './Review.css'


const ReviewBox = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);

  const handleInputChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() && username.trim() && rating) {
      const reviewData = {
        text: newReview,
        user: username,
        stars: rating,
        time: new Date().toISOString()
      };
      setReviews([...reviews, reviewData]);
      setNewReview('');
      setUsername('');
      setRating(0);
    }
  };

  // Function to format the date into a "time ago" format
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="review-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Your name"
        />
        <textarea
          value={newReview}
          onChange={handleInputChange}
          placeholder="Write your review..."
        />
        <select value={rating} onChange={handleRatingChange}>
          <option value="0">Rate the product</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button type="submit">Submit Review</button>
      </form>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <div className="review-content">
              <p><strong>{review.user}</strong> rated this <strong>{review.stars} stars</strong></p>
              <p>{review.text}</p>
              <p className="review-time">{timeAgo(review.time)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewBox;
