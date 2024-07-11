import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Review.css'; // Make sure to import the CSS file
import { useParams } from 'react-router-dom';

export default function Review() {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/Restaurant/reviews/${id}`);
            setReviews(response.data);
        } catch (err) {
            console.error('Error fetching reviews:', err.message);
        }
    };

    const handleStarClick = (index) => {
        setRating(index);
    };

    const handleSubmit = async () => {
        if (!rating) {
            setMessage('Please rate the restaurant first');
            return;
        }
        setMessage('');

        try {
            const response = await axios.post(`http://localhost:3001/Restaurant/add-review/${id}`, {
                rating,
                comment,
            });
            setMessage('');
            fetchReviews(); // Refresh the reviews list
        } catch (err) {
            console.error('Error submitting review:', err.message);
            setMessage('Error submitting review');
        }
    };

    return (
        <div className="review-container">
            <div className="custom-card">
                <div className="custom-card-header">
                    <h2>Rate The Restaurant</h2>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <span
                                    key={index}
                                    className={`star ${index <= rating ? 'filled-star' : 'empty-star'}`}
                                    onClick={() => handleStarClick(index)}
                                >
                                    {index <= rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>
                    <textarea
                        className="form-control mb-3"
                        placeholder="Enter your comment here"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="comment-info">
                        <span className="comment-length">({comment.length} characters)</span>
                        <span className="comment-warning">
                            {comment.length > 199 ? '(0 to 200 characters allowed)' : null}
                        </span>
                    </div>
                    {message && <h6 className="text-danger">{message}</h6>}
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>

            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review._id} className="review-item">
                        <div className="review-header">
                            {review.user_id && (
                                <span className="reviewer-name">{review.user_id.name}</span>
                            )}
                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <span
                                        key={index}
                                        className={`star ${index <= review.rating ? 'filled-star' : 'empty-star'}`}
                                    >
                                        {index <= review.rating ? '★' : '☆'}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="review-comment">{review.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
