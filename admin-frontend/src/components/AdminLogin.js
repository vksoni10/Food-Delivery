// import React, { useState } from 'react';
// import axios from 'axios';
// import './AdminLogin.css'; // Ensure to create and style this CSS file accordingly
// import logo from './logo.jpg'; // Ensure the path to your logo image is correct

// const AdminLogin = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3001/admin/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       onLogin();
//     } catch (error) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="overlay">
//       <div className="login-container">
//         <img src={logo} alt="Fox-Food Delivery Logo" />
//         <h2>Admin Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input 
//             type="email" 
//             name="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required 
//           />
//           <input 
//             type="password" 
//             name="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required 
//           />
//           <input type="submit" value="LOGIN" />
//         </form>
//         <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
