import React, {useState, useEffect} from "react";
import './Home.css';
import './Login.css'
import bg from "../front.avif";
import bg1 from "../components/logo1.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  return (
    <>
      <Navbar/>
    <div className="home">

      <div className="content">
        <h1>POTATO</h1>
        <h4>Discover the best food and drinks in your area</h4>
                    <h4>For the foodies!</h4>        
                    <NavLink className="button style" to='/auth/restaurants'>Order Now</NavLink>
                    
      </div>
    </div>
    </>
  );
}
