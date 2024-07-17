import React, { useState } from "react";
import axios from "axios";
import "./Menu.css";
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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="menu-item-inputs">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="dishName"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="Dish Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="dishType"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              placeholder="Dish Type"
              required
            />
          </div>
          <div className="custom-file mb-3">
            <input
              type="file"
              className="custom-file-input"
              name="dishImage"
              onChange={(e) => setDishImage(e.target.files[0])}
              required
            />
            <label class="custom-file-label" htmlFor="customFile">
              Upload Item Image
            </label>
          </div>
          <div className="add-item">
            <button type="submit" className="btn btn-secondary">
              Add Menu Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMenu;
