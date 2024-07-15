import axios from "axios";
import React, { useState, useEffect } from "react";
// import './Reviews.css'; // Make sure to import the CSS file
import { useParams } from "react-router-dom";

export default function Reviews() {
  const { reviewId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, [reviewId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
      `http://localhost:3001/Restaurant/reviews/${reviewId}`
      );
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err.message);
    }
  };

  return (
    <div className="reviews-list">
      {reviews.map((review) => (
        <div key={review._id} className="review-item">
          <div className="review-header">
            <span className="reviewer-name">{review.username}</span>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((index) => (
                <span
                  key={index}
                  className={`star ${
                    index <= review.rating ? "filled-star" : "empty-star"
                  }`}
                >
                  {index <= review.rating ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
          <div className="review-comment">{review.comment}</div>
          <div className="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
