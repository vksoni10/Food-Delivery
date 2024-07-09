import React from "react";

export default function RestaurantHome() {
  return (
    <>
      <div className="restaurant-dashboard">
        <div className="header">
          <h1>Restaurant Dashboard</h1>
          <p>Welcome, [Restaurant Name]!</p>
        </div>
        <div className="stats">
          <div className="stat">
            <h2>Orders Today</h2>
            <p>12</p>
          </div>
          <div className="stat">
            <h2>Total Earnings</h2>
            <p>$500.00</p>
          </div>
          <div className="stat">
            <h2>Average Rating</h2>
            <p>4.5/5</p>
          </div>
        </div>
        <div className="orders">
          <h2>Recent Orders</h2>
          <table>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Order Total</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>#1234</td>
              <td>John Doe</td>
              <td>$25.99</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>#1235</td>
              <td>Jane Doe</td>
              <td>$30.99</td>
              <td>In Progress</td>
            </tr>
            <tr>
              <td>#1236</td>
              <td>Bob Smith</td>
              <td>$20.99</td>
              <td>Delivered</td>
            </tr>
          </table>
        </div>
        <div className="menu">
          <h2>Menu Management</h2>
          <ul>
            <li>
              <a href="#">Add New Item</a>
            </li>
            <li>
              <a href="#">Edit Menu Categories</a>
            </li>
            <li>
              <a href="#">View Menu Items</a>
            </li>
          </ul>
        </div>
        <div className="settings">
          <h2>Restaurant Settings</h2>
          <ul>
            <li>
              <a href="#">Edit Restaurant Profile</a>
            </li>
            <li>
              <a href="#">Change Password</a>
            </li>
            <li>
              <a href="#">Payment Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
