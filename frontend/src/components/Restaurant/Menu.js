import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Menu.css";
import {jwtDecode} from "jwt-decode";

const Menu = (restaurantId) => {
  const [menu, setMenu] = useState([]);
  const [resName, setResName] = useState("");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const { resName } = decoded;
        setResName(resName);
        console.log(resName);
        return resName;
      }
      return null;
    };

    const fetchMenu = async (resName) => {
      try {
        const response = await axios.get(`http://localhost:3001/Restaurant/${resName}/menu`);
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchRestaurantName().then((resName) => {
      if (resName) {
        fetchMenu(resName);
      }
    });
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/Restaurant/${resName}/menu/${itemId}`);
      setMenu(menu.filter(item => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div className="menu">
      <NavLink to="/Restaurant/createMenu" className="add-button">
        Add +
      </NavLink>
      <div className="menu-table">
        <table>
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Item Price</th>
              <th scope="col">Item Type</th>
              <th scope="col">Item Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item._id}>
                <td>{item.dishName}</td>
                <td>{item.price}</td>
                <td>{item.dishType}</td>
                <td>
                  <img src={item.dishImage} alt={item.dishName} width="100" />
                </td>
                <td>
                  <NavLink to={`/Restaurant/updateMenu/${item._id}`}>
                    Update
                  </NavLink>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
