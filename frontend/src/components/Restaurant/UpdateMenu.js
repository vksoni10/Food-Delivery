import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UpdateMenu = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [dishType, setDishType] = useState("");
  const [dishImage, setDishImage] = useState(null);
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

    const fetchMenuItem = async (resName) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/Restaurant/${resName}/menu/${itemId}`
        );
        const { dishName, price, dishType, dishImage } = response.data;
        setDishName(dishName);
        setPrice(price);
        setDishType(dishType);
        setDishImage(dishImage);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      }
    };

    fetchRestaurantName().then((resName) => {
      if (resName) {
        fetchMenuItem(resName);
      }
    });
  }, [itemId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dishName", dishName);
    formData.append("price", price);
    formData.append("dishType", dishType);
    if (dishImage instanceof File) {
      formData.append("dishImage", dishImage);
    }

    try {
      await axios.put(
        `http://localhost:3001/Restaurant/${resName}/menu/${itemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/Restaurant/menu");
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleUpdate}>
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
              type="number"
              className="form-control"
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
            />
            <label class="custom-file-label" htmlFor="customFile">
              Upload Item Image
            </label>
          </div>
          <div className="update-item">
            <button type="submit" className="btn btn-success">
              Update Menu Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenu;
