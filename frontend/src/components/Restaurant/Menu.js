import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
//import MenuTable from "./MenuTable";
import "./Menu.css";

const Menu = (restaurantId) => {
  
  const [menu, setMenu] = useState([]);
  console.log(menu);

  useEffect(() => {
        axios.get(`http://localhost:3001/Restaurant/${restaurantId}/menu`)
            .then(response => {
                setMenu(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, [restaurantId]);
  

 
  return (
    <div className="menu">
      <NavLink to="/Restaurant/createMenu" className="add-button">
        Add +
      </NavLink>
      <div className="menu-table">
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Type</th>
              <th>Item Image</th>
              <th>Actions</th>
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
                  <button >Delete</button>
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
