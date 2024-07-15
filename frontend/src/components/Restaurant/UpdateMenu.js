import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMenu = () => {
  const { id } = useParams();
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [dishType, setDishType] = useState("");
  const navigate = useNavigate();

  // UpdateMenu.js
  useEffect(() => {
    axios
      .get(`http://localhost:3001/Restaurant/menu/${id}`)
      .then((response) => {
        const { dishName, price, dishImage, dishType } = response.data;
        setDishName(dishName);
        setPrice(price);
        setDishImage(dishImage);
        setDishType(dishType);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/Restaurant/menu/${id}`, {
        dishName,
        price,
        dishImage,
        dishType,
      })
      .then((result) => {
        console.log(result);
        navigate("/Restaurant/menu");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          console.error(err);
        }
      });
  };

  return (
    <div className="update-menu-form">
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
          <button type="submit">Update Menu Item</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenu;
