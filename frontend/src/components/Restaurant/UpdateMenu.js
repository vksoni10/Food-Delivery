import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useParams, useNavigate } from "react-router-dom";

export default function UpdateMenu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");
  const [dishImage, setDishImage] = useState("");
  const [dishType, setDishType] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/UpdateMenu/" + id)
      .then((result) => {
        setDishType(result.data.dishType);
        setDishName(result.data.dishName);
        setPrice(result.data.price);
        setDishImage(result.data.dishImage);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchRestaurantName = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const decoded = jwtDecode(token);
      const { resName } = decoded;
      return resName;
    }
    return null;
  };

  const updateMenu = async (e) => {
    e.preventDefault();
    const resName = await fetchRestaurantName();
    if (!resName) {
      alert("User not authenticated");
      return;
    }
    await axios
      .post("http://localhost:3001/Restaurant/UpdateMenu", {
        dishName,
        price,
        dishImage,
        dishType,
        resName,
      })
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

  return (
    <>
      <div className="update">
        <form onSubmit={updateMenu}>
          <h4>Update Item Details</h4>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingItemName"
              placeholder="Item Name"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingItemPrice"
              placeholder="Item Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Price</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingItemType"
              placeholder="Item Type"
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Type</label>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Item Image</label>
            <input
              type="file"
              className="form-control"
              value={dishImage}
              onChange={(e) => setDishImage(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </>
  );
}
