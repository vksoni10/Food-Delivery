import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateMenu = ({ onMenuAdd }) => {
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [dishImage, setDishImage] = useState(null);
  const [dishType, setDishType] = useState("");

  const fetchRestaurantName = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const { resName } = decoded;
      return resName;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resName = await fetchRestaurantName();
    if (!resName) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("price", price);
    formData.append("dishImage", dishImage);
    formData.append("dishType", dishType);
    formData.append("resName", resName);

    await axios
      .post(`http://localhost:3001/Restaurant/menu`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        onMenuAdd(result.data);
        setDishName("");
        setPrice("");
        setDishImage(null);
        setDishType("");
        console.log(result.data);
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
            type="file"
            name="dishImage"
            onChange={(e) => setDishImage(e.target.files[0])}
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
          <button type="submit">Add Menu Item</button>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
