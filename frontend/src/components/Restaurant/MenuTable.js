import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import axios from 'axios';

const MenuTable = ({ menu , setMenu }) => {
    const handleDelete = (id) => {
        axios
          .delete(`http://localhost:3001/Restaurant/menu/${id}`)
          .then(() => {
            // Refresh the menu after deletion
            setMenu((prevMenu) => prevMenu.filter((item) => item._id !== id));
          })
          .catch((err) => console.error(err));
    };
    
      return (
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
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default MenuTable;



