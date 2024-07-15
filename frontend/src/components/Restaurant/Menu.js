import React, { useEffect, useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/restaurant/menu")
      .then((response) => setMenu(response.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/restaurant/menu/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="menu table">
        <NavLink to="/Restaurant/createMenu">Add</NavLink>
      </div>
      <div>
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
    // src/pages/RegisterRestaurant.js
    // import React, { useState } from 'react';
    //   import axios from 'axios';
    //   import { useNavigate } from 'react-router-dom';

    //   const Menu = () => {

    //     const [menu, setMenu] = useState([{ dishName: '', price: '', dishImage: '' }]);

    //     const navigate = useNavigate();

    //     const handleMenuChange = (index, e) => {
    //       const newMenu = [...menu];
    //       newMenu[index][e.target.name] = e.target.value;
    //       setMenu(newMenu);
    //     };

    //     const addMenuItem = () => {
    //       setMenu([...menu, { dishName: '', price: '', dishImage: '' }]);
    //     };

    //     const handleSubmit = (e) => {
    //       e.preventDefault();
    //       axios.post('http://localhost:3001/Restaurant/menu', {
    //         menu
    //       })
    //         .then((result) => {
    //           console.log(result);
    //           navigate('/Restaurant/login');
    //         })
    //         .catch((err) => {
    //           if (err.response && err.response.status === 400) {
    //             alert(err.response.data.message);
    //           } else {
    //             console.error(err);
    //           }
    //         });
    //     };

    //     return (
    //       <form onSubmit={handleSubmit}>

    //         {menu.map((item, index) => (
    //           <div key={index}>
    //             <input type="text" name="dishName" value={item.dishName} onChange={(e) => handleMenuChange(index, e)} placeholder="Dish Name" required />
    //             <input type="number" name="price" value={item.price} onChange={(e) => handleMenuChange(index, e)} placeholder="Price" required />
    //             <input type="text" name="dishImage" value={item.dishImage} onChange={(e) => handleMenuChange(index, e)} placeholder="Dish Image URL" required />
    //           </div>
    //         ))}
    //         <button type="button" onClick={addMenuItem}>Add Menu Item</button>

    //         <button type="submit">Register Restaurant</button>
    //       </form>
    //     );
    //   }
    // }
  );
}
