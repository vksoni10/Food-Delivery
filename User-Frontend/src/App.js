// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Restaurants from './components/Restaurants';
import Home from './components/Home';
import Kanha from './components/Kanha';
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
          <Route exact path='/auth/restaurants' element={<Restaurants />} />
          <Route exact path='/restaurant/:id' element={<RestroDetail />} /> {/* Add this route */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
