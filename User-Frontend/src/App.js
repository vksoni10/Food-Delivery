// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Restaurants from './components/Restaurants';
import Checkout from './components/Checkout';
import Home from './components/Home';
import Kanha from './components/Kanha';
import Cart from './components/Cart';
import RestroDetail from './components/RestroDetail'; // Import RestroDetail

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/auth/register' element={<Register />} />
          <Route exact path='/auth/login' element={<Login />} />
          <Route exact path='/auth/kanha' element={<Kanha />} />
          <Route exact path='/auth/cart' element={<Cart />} />
          <Route exact path='/auth/restaurants' element={<Restaurants />} />
          <Route exact path='/auth/logout' element={<Logout />} />
          <Route exact path='/auth/checkout' element={<Checkout />} />
          <Route exact path='/restaurant/:id' element={<RestroDetail />} /> {/* Add this route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
