 import React from 'react';
// // import './Reviews.css'; // Make sure to import the CSS file
// import { useParams } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

export default function Reviews() {
//     const { id } = useParams();
//     const [user, setUser] = useState({});

//     const [reviews, setReviews] = useState([]);
    

//     useEffect(() => {
//         fetchReviews(); 
//         fetchUserProfile();
//     }, [id]);
//     const fetchUserInfo = async () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//           const decoded = jwtDecode(token);
//           const { name, email, mobile, addresses } = decoded;
//           return { name, email, mobile, addresses };
//       }
//       return null;
//   };
//   const fetchReviews = async () => {
//       try {
//           const response = await axios.get(`http://localhost:3001/Restaurant/reviews/${id}`);
//           setReviews(response.data);
//       } catch (err) {
//           console.error('Error fetching reviews:', err.message);
//       }
//   };
//     const fetchUserProfile = async () => {
//       try {
//           const userInfo = await fetchUserInfo();
//           if (userInfo) {
//               setUser(userInfo);
//           }
//       } catch (err) {
//           console.log(err);
//       }
//   };

 return (
  <div>reviews</div>
//       <div className="reviews-list">
//                 {reviews.map((review) => (
//                     <div key={review._id} className="review-item">
//                         <div className="review-header">
//                             <span className="reviewer-name">{review.username}</span>
//                             <div className="rating-stars">
//                                 {[1, 2, 3, 4, 5].map((index) => (
//                                     <span
//                                         key={index}
//                                         className={`star ${index <= review.rating ? 'filled-star' : 'empty-star'}`}
//                                     >
//                                         {index <= review.rating ? '★' : '☆'}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="review-comment">{review.comment}</div>
//                         <div className="review-date">{new Date(review.createdAt).toLocaleDateString()}</div>
//                     </div>
//                 ))}
//             </div>
       
     );
 }