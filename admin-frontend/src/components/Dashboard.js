import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making HTTP requests
import { Chart as ChartJS, ArcElement, PointElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [restaurantCount, setRestaurantCount] = useState(0);

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/users');
        setUserCount(response.data.length); // Assuming response is an array
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserCount();
    const intervalUser = setInterval(fetchUserCount, 300);

    return () => clearInterval(intervalUser);
  }, []);


  useEffect(() => {
    const fetchRestaurantCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/restaurantslist');
        setRestaurantCount(response.data.length); // Assuming response is an array
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantCount();
    const intervalRestaurant = setInterval(fetchRestaurantCount, 300);

    return () => clearInterval(intervalRestaurant);
  }, []);

  const lineData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Products Delivered',
        data: [30, 25, 40, 45, 50, 60, 55, 70, 65, 80, 75, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Products Cancelled',
        data: [5, 10, 7, 8, 6, 10, 9, 6, 8, 5, 7, 6],
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
        borderColor: 'rgba(192, 192, 192, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ['Received', 'Processing', 'Restaurant', 'Delivery People'],
    datasets: [
      {
        data: [156, 2, 7, 3],
        backgroundColor: ['#3498db', '#f1c40f', '#e74c3c', '#2ecc71'],
        hoverBackgroundColor: ['#2980b9', '#f39c12', '#c0392b', '#27ae60'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="stats-container">
        <div className="order-stats box">
          <h3>
            <i className="fas fa-shopping-cart"></i> Order Statistics
          </h3>
          <div className="stats">
            <button className="stat-box blue" onClick={() => handleNavigation('/dispatcher/pending-orders')}>
              <p>Received</p>
              <span>156</span>
            </button>
            <button className="stat-box yellow" onClick={() => handleNavigation('/dispatcher/processing-orders')}>
              <p>Processing</p>
              <span>2</span>
            </button>
            <button className="stat-box green" onClick={() => handleNavigation('/dispatcher/completed-orders')}>
              <p>Delivered</p>
              <span>22</span>
            </button>
            <button className="stat-box red" onClick={() => handleNavigation('/dispatcher/cancelled-orders')}>
              <p>Cancelled</p>
              <span>18</span>
            </button>
          </div>
        </div>

        <div className="site-stats box">
          <h3>
            <i className="fas fa-chart-line"></i> Site Statistics
          </h3>
          <div className="stats">
          <button className="stat-box blue" onClick={() => handleNavigation('/restaurantslist')}>
              <p>Restaurant</p>
              <span>{restaurantCount}</span>
            </button>
            <button className="stat-box green" onClick={() => handleNavigation('/user')}>
              <p>Users</p>
              <span>{userCount}</span>
            </button>
            <button className="stat-box red" onClick={() => handleNavigation('/dashboard')}>
              <p>Earnings</p>
              <span>150 Rupya</span>
            </button>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="product-sales box">
          <h3>
            <i className="fas fa-chart-area"></i> Product Sales
          </h3>
          <Line data={lineData} />
        </div>
        <div className="orders-pie box">
          <h3>
            <i className="fas fa-chart-pie"></i> Orders
          </h3>
          <div className="pie-chart">
            <Pie data={pieData} width={400} height={400} />
          </div>
        </div>
      </div>

      <div className="latest-orders box">
        <h3>
          <i className="fas fa-cart-plus"></i> Latest Orders
        </h3>
        {[1, 2, 3].map((order, index) => (
          <div className="order" key={index}>
            <img src="https://via.placeholder.com/50" alt="Dish" />
            <div className="order-details">
              <p>
                <strong>Restaurant Name {index + 1}</strong>
              </p>
              <p>Dish Name</p>
              <p>Status: Delivered</p>
              <p>Order No: #{1234 + index}</p>
              <p>
                <i className="fas fa-clock"></i> {30 + index * 15} mins ago
              </p>
              <p>Restaurant Location</p>
              <p>Delivery Location</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
