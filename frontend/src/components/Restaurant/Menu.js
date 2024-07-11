import React, { useEffect, useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/menu")
      .then((response) => setMenu(response.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/menu/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="menu">
        <NavLink to="/Restaurant/createMenu">Add</NavLink>
      </div>
      <div>
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
            {menu.map((item) => {
              return (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.itemPrice}</td>
                  <td>{item.itemType}</td>
                  <td>{item.itemImage}</td>
                  <td>
                    <NavLink to={`/Restaurant/updateMenu/${item._id}`}>
                      Update
                    </NavLink>
                    <button onClick={(e) => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
