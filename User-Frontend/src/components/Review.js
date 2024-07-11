import axios from 'axios';
import React, { useState } from 'react';
// import { toast } from 'react-toastify';
import './Review.css'; // Make sure to import the CSS file

export default function Review(props) {
    const { product_id, user_id } = props;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const handleStarClick = (index) => {
        setRating(index);
        console.log(index);
    };

    const handleSubmit = () => {
        console.log(rating, comment, "Hello");
        if (!rating) {
            // toast.warn('Please rate the product first')
            // toast.error('Please rate the product first')
            return;
        }
        setMessage('');
        // axios.post(`${BASE_URL}/user/add-rating/${product_id}`,{
        //     user_id:user_id,
        //     rating: rating,
        //     comment: comment
        // })
        // .then((result)=>{
        //     console.log(result.data)
        //     alert(result.data.message)
        //     setMessage(result.data.message)
        //     window.location.reload()
        // }).catch((error)=>{
        //     console.log(error)
        //     // alert(error)
        // })
    };

    return (
        <div className="custom-card">
            <div className="custom-card-header">
                <h2>Ratings</h2>
            </div>
            <div className="card-body">
                <div className="text-center">
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span
                                key={index}
                                className={`star ${index <= rating ? 'filled-star' : 'empty-star'}`}
                                onClick={() => handleStarClick(index)}>
                                {index <= rating ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                </div>
                {/* <span className='optional-text'>(Optional)</span> */}
                <textarea
                    className="form-control mb-3"
                    placeholder="Enter your comment here"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="comment-info">
                    <span className='comment-length'>({comment.length} characters)</span>
                    <span className='comment-warning'>{comment.length > 199 ? '(0 to 200 characters allowed)' : <></>}</span>
                </div>
                {message && <h6 className='text-danger'>{message}</h6>}
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
