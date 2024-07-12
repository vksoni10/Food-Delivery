import React, { useState, useEffect } from "react";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateMenu() {
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemType, setItemType] = useState();
  const [itemImage, setItemImage] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/menu", {
        itemName,
        itemPrice,
        itemType,
        itemImage,
      })
      .then((result) => {
        console.log(result);
        navigate("/Restaurant/menu");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="create">
        <form onSubmit={handleSubmit}>
          <h4>Enter Item Details</h4>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingItemName"
              placeholder="Item Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingItemPrice"
              placeholder="Item Price"
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Price</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingItemType"
              placeholder="Item Type"
              onChange={(e) => setItemType(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Type</label>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Item Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setItemImage(e.target.value)}
            />
          </div>
          <button className="btn btn-success mx-1">Submit</button>
        </form>
      </div>
    </>
  );
}
