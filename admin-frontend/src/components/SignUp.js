// import React, { useState } from 'react';
// import axios from 'axios';
// import './SignUp.css';
// import logo from './logo.jpg';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email: '',
//     password: '',
//     confirm_password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/admin/signup", formData);
//       console.log(response.data);
//       // Redirect to login page or show success message
//     } catch (error) {
//       console.error("Error signing up:", error.response ? error.response.data : error.message);
//       // Show error message to the user
//     }
//   };

//   return (
//     <div className="container">
//       <div className="signup-box">
//         <img src={logo} alt="Fox-Food Delivery Logo" className="logo" />
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="textbox">
//             <input type="text" placeholder="Full Name" name="fullname" value={formData.fullname} onChange={handleChange} required />
//           </div>
//           <div className="textbox">
//             <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
//           </div>
//           <div className="textbox">
//             <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
//           </div>
//           <div className="textbox">
//             <input type="password" placeholder="Confirm Password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
//           </div>
//           <button type="submit" className="btn">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
