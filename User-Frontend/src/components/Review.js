// import React, { useState } from 'react';
// import './Review.css'


// const ReviewBox = () => {
//   const [reviews, setReviews] = useState([]);
//   const [newReview, setNewReview] = useState('');
//   const [username, setUsername] = useState('');
//   const [rating, setRating] = useState(0);

//   const handleInputChange = (e) => {
//     setNewReview(e.target.value);
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleRatingChange = (e) => {
//     setRating(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (newReview.trim() && username.trim() && rating) {
//       const reviewData = {
//         text: newReview,
//         user: username,
//         stars: rating,
//         time: new Date().toISOString()
//       };
//       setReviews([...reviews, reviewData]);
//       setNewReview('');
//       setUsername('');
//       setRating(0);
//     }
//   };

//   // Function to format the date into a "time ago" format
//   const timeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const seconds = Math.floor((new Date() - date) / 1000);
//     let interval = seconds / 31536000;

//     if (interval > 1) {
//       return Math.floor(interval) + " years ago";
//     }
//     interval = seconds / 2592000;
//     if (interval > 1) {
//       return Math.floor(interval) + " months ago";
//     }
//     interval = seconds / 86400;
//     if (interval > 1) {
//       return Math.floor(interval) + " days ago";
//     }
//     interval = seconds / 3600;
//     if (interval > 1) {
//       return Math.floor(interval) + " hours ago";
//     }
//     interval = seconds / 60;
//     if (interval > 1) {
//       return Math.floor(interval) + " minutes ago";
//     }
//     return Math.floor(seconds) + " seconds ago";
//   };

//   return (
//     <div className="review-box">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={username}
//           onChange={handleUsernameChange}
//           placeholder="Your name"
//         />
//         <textarea
//           value={newReview}
//           onChange={handleInputChange}
//           placeholder="Write your review..."
//         />
//         <select value={rating} onChange={handleRatingChange}>
//           <option value="0">Rate the product</option>
//           <option value="1">1 Star</option>
//           <option value="2">2 Stars</option>
//           <option value="3">3 Stars</option>
//           <option value="4">4 Stars</option>
//           <option value="5">5 Stars</option>
//         </select>
//         <button type="submit">Submit Review</button>
//       </form>
//       <div className="reviews-list">
//         {reviews.map((review, index) => (
//           <div key={index} className="review-item">
//             <div className="review-content">
//               <p><strong>{review.user}</strong> rated this <strong>{review.stars} stars</strong></p>
//               <p>{review.text}</p>
//               <p className="review-time">{timeAgo(review.time)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReviewBox;

import axios from 'axios';
// import axios from '../Config/Interceptor';
import React, { useState } from 'react';
// import { toast } from 'react-toastify';

export default function Review(props) {
    const {product_id, user_id} = props
    // console.log(product_id, user_id)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [commentClicked, setCommentClicked] = useState(false);
    const [message, setMessage] = useState('')

    const handleStarClick = (index) => {
        setRating(index);
        console.log(index)
    };

    // const handleCommentClick = () => {
    //     setCommentClicked(true);
    // };

    // const handleSubmit = () => {
    //     alert('Comment submitted!');
    // };
    const handleSubmit =()=>{
        console.log(rating, comment, "Hello")
        if(!rating){
            // toast.warn('Please rate the product first')
            // toast.error('Please rate the product first')
            return 
        }
        // if(!comment){
        //     return alert('Please rate the product first')
        // }
        setMessage('')
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
        //   }).catch((error)=>{
        //   console.log(error)
        //   // alert(error)
        // })
      }

    return (
        <div className={`containe mt-1 w-100 `} >
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-12"> {/* Adjusted width and added col-lg-6 for landscape mode */}
                    <div className="card border-secondary w-100" style={{width: 'fit-content'}}>
                        <div className="card-header bg-primary d-flex justify-content-center align-items-center mb-0 ">
                                <h2>Rate The Product</h2>
                            {/* <span className="mb-0"></span> */}
                        </div>
                        <div className="card-body" >
                            <div className="text-center">                               
                                <div className="rating-stars mb-3 fs-1">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <span
                                            key={index}
                                            style={{cursor:'pointer'}}
                                            className="star text-warning cursor-pointer"
                                            onClick={() => handleStarClick(index)}>
                                            {index <= rating ? '★' : '☆'}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <span className='bg-light'>(Optional)</span>
                            <textarea
                                className={`form-control mb-3 `}
                                placeholder="Enter your comment here"
                                rows={4}
                                value={comment}
                                
                                // onInput={(e) => {
                                //     const maxLength = 200;
                                //     const input = e.target.value;
                                //     const trimmedInput = input.slice(0, maxLength);
                                //     e.target.value = trimmedInput;
                                //     setPincode(trimmedInput); // Update the state with the trimmed input
                                //   }}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div  style={{display:'flex', justifyContent:'space-between'}}>

                                <span className='bg-light'>({comment.length} characters)</span>
                                <span className='text-danger'>{comment.length > 199 ? '(0 to 200 characters allowed)': <></> }</span>
                            </div>
                            {
                                message ?
                                <h6 className='text-danger'>{message}</h6>
                                :<></>
                            }
                            <button className="btn btn-primary mt-2" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
