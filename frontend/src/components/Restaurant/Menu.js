import React, { useEffect, useState } from "react";
import "./Menu.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [dishType, setDishType] = useState("");
  const navigate = useNavigate();

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
        setMenu(menu.filter((item) => item._id !== id)); // Update the state to remove the deleted item
      })
      .catch((err) => console.log(err));
  };

  const handleMenuChange = (index, e) => {
    const newMenu = [...menu];
    newMenu[index][e.target.name] = e.target.value;
    setMenu(newMenu);
  };

  const addMenuItem = () => {
    setMenu([...menu, { dishName: "", price: "", dishImage: "", dishType: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Restaurant/menu", { dishName, price, dishImage, dishType })
      .then((result) => {
        console.log(result);
        navigate("/Restaurant/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      });
  };
  console.log(dishName)

  return (
    <>
      <div className="menu">
        <NavLink to="#" onClick={addMenuItem}>Add</NavLink>
      </div>
      <div className="add-menu-form">
        <form onSubmit={handleSubmit}>
          <div className="menu-item-inputs">
            <input
              type="text"
              name="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="Dish Name"
              required
            />
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
            <input
              type="text"
              name="dishImage"
              value={dishImage}
              onChange={(e) => setDishImage(e.target.value)}
              placeholder="Dish Image URL"
              required
            />
            <input
              type="text"
              name="dishType"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              placeholder="Dish Type"
              required
            />
            <button type="submit">Register Restaurant</button>
          </div>
        </form>
      </div>
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
            {menu.map((item, index) => (
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
    </>
  );
}
