import axios from "axios";
import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected import statement
import "./Review.css"

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [resName, setResName] = useState("");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { resName } = decoded;
        setResName(resName);
        console.log(resName);
        return resName;
      }
      return null;
    };

    const fetchReviews = async (resName) => {
      try {
        console.log(resName);

        const response = await axios.get(
          `http://localhost:3001/Restaurant/review/${resName}`
        );
        console.log(response.data);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err.message);
      }
    };

    fetchRestaurantName().then((resName) => {
      if (resName) {
        fetchReviews(resName);
      }
    });
  }, []); // Ensure this useEffect runs only once on component mount

  return (
    <div className="reviews-list">
      <div>hello</div>
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
