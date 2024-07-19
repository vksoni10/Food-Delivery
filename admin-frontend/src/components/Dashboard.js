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
  const [receivedCount, setReceivedCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [earning, setEarning] = useState(0);
  const [monthlyData, setMonthlyData] = useState({
    delivered: [],
    cancelled: []
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Admins/users');
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
        const response = await axios.get('http://localhost:3001/Admins/restaurantslist');
        setRestaurantCount(response.data.length); // Assuming response is an array
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantCount();
    const intervalRestaurant = setInterval(fetchRestaurantCount, 300);

    return () => clearInterval(intervalRestaurant);
  }, []);

  useEffect(() => {
    const fetchOrderCountsAndEarnings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Admins/all');
        const orders = response.data; // Assuming response is an array
        const receivedOrders = orders.filter(order => ['Order Created', 'Order Accepted'].includes(order.status));
        const processingOrders = orders.filter(order => ['Order is Being Prepared', 'Order Has Been Prepared', 'Order on Your Way'].includes(order.status));
        const deliveredOrders = orders.filter(order => order.status === 'Order Delivered');
        const cancelledOrders = orders.filter(order => order.status === 'Order Cancelled');

        setReceivedCount(receivedOrders.length);
        setProcessingCount(processingOrders.length);
        setDeliveredCount(deliveredOrders.length);
        setCancelledCount(cancelledOrders.length);

         // Filter orders based on status and calculate counts
         const deliveredData = Array(12).fill(0);
         const cancelledData = Array(12).fill(0);
 
         orders.forEach(order => {
           const status = order.status;
           const createdAt = new Date(order.createdAt);
           const month = createdAt.getMonth(); // Month is 0-indexed (0 = January, 11 = December)
 
           if (status === 'Order Delivered') {
             deliveredData[month]++;
           } else if (status === 'Order Cancelled') {
             cancelledData[month]++;
           }
         });
 
         setDeliveredCount(deliveredData.reduce((total, count) => total + count, 0));
         setCancelledCount(cancelledData.reduce((total, count) => total + count, 0));
 
         const monthlyDelivered = deliveredData.map((count, index) => ({
           month: index + 1,
           value: count
         }));
 
         const monthlyCancelled = cancelledData.map((count, index) => ({
           month: index + 1,
           value: count
         }));
 
         setMonthlyData({
           delivered: monthlyDelivered,
           cancelled: monthlyCancelled
         });

         setPieData({
          labels: ['Received', 'Processing', 'Cancelled', 'Delivered'],
          datasets: [
            {
              data: [receivedCount, processingCount, cancelledCount, deliveredCount],
              backgroundColor: ['#3498db', '#f1c40f', '#e74c3c', '#2ecc71'],
              hoverBackgroundColor: ['#2980b9', '#f39c12', '#c0392b', '#27ae60'],
            },
          ],
        });
      


   // Calculate total earnings
   const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
   const revenueAfterGST = totalRevenue * 0.82;
   const platformRevenue = revenueAfterGST * 0.10;
   setEarning(platformRevenue.toFixed(2)); // Round to 2 decimal places



 } catch (error) {
   console.error('Error fetching order data:', error);
 }
};

fetchOrderCountsAndEarnings();
const intervalOrders = setInterval(fetchOrderCountsAndEarnings, 300);

return () => clearInterval(intervalOrders);
}, []);


  const barData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      {
        label: 'Products Delivered',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: monthlyData.delivered.map(data => data.value),
      },
      {
        label: 'Products Cancelled',
        backgroundColor: 'rgba(192, 192, 192, 0.2)',
        borderColor: 'rgba(192, 192, 192, 1)',
        borderWidth: 1,
        data: monthlyData.cancelled.map(data => data.value),
      },
    ],
  };

  const pieData = {
    labels: ['Received', 'Processing', 'Cancelled', 'Delivered'],
    datasets: [
      {
        data: [receivedCount, processingCount, cancelledCount, deliveredCount],
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
            <button className="stat-box blue" onClick={() => handleNavigation('/received')}>
              <p>Received</p>
              <span>{receivedCount}</span>
            </button>
            <button className="stat-box yellow" onClick={() => handleNavigation('/processing')}>
              <p>Processing</p>
              <span>{processingCount}</span>
            </button>
            <button className="stat-box green" onClick={() => handleNavigation('/delivered')}>
              <p>Delivered</p>
              <span>{deliveredCount}</span>
            </button>
            <button className="stat-box red" onClick={() => handleNavigation('/cancelled')}>
              <p>Cancelled</p>
              <span>{cancelledCount}</span>
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
              <span>Rs {earning}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="product-sales box">
          <h3>
            <i className="fas fa-chart-area"></i> Product Sales
          </h3>
          <Line data={barData} />
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
    </div>
  );
};

export default Dashboard;
