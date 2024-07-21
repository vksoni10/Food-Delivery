import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Restaurants from './components/Restaurants';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Home from './components/Home';
import Kanha from './components/Kanha';
import Tracking from './components/Tracking';
import Cart from './components/Cart';
import RestroDetail from './components/RestroDetail'; 
import Menu from './components/Menu';
import OrderConfirmation from './components/Orderconfirmation';
import ProtectedRoute from './components/ProtectedRoute';
import MyOrders from './components/MyOrders';
import { CartProvider } from './components/CartContext';



function App() {
  return (
    <CartProvider>
    <Router>
      <main>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/auth/register' element={<Register />} />
          <Route exact path='/auth/login' element={<Login />} />
          <Route exact path='/auth/kanha' element={<Kanha />} />
          <Route exact path='/auth/cart' element={<Cart />} />
          <Route exact path='/auth/restaurants' element={<Restaurants />} />
          <Route exact path='/auth/logout' element={<Logout />} />
          <Route
            exact
            path='/auth/checkout'
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/auth/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/auth/myorders'
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route exact path='/auth/track' element={<Tracking />} />
          <Route exact path='/restaurant/:id' element={<RestroDetail />} /> 
          <Route
            exact
            path='/order-confirmation/:orderId'
            element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            }
          />
          <Route exact path='/restaurant/:id/menu' element={<Menu />} /> 
        </Routes>
      </main>
    </Router>
    </CartProvider>
  );
}

export default App;
