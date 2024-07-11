import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [itemType, setItemType] = useState();
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemImage, setItemImage] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/menu/" + id)
      .then((result) => {
        setItemType(result.data.itemType);
        setItemName(result.data.itemName);
        setItemPrice(result.data.itemPrice);
        setItemImage(result.data.itemImage);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateMenu = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/updateMenu" + id, {
        itemImage,
        itemName,
        itemPrice,
        itemType,
      })
      .then((result) => {
        console.log(result);
        navigate("/Restaurant/menu");
      })
      .catch((err) => console.log(err));
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
              value={itemName}
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
              value={itemPrice}
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
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            />
            <label htmlFor="floatingInput">Item Type</label>
          </div>
          <div className="input-group mb-3">
            <label className="input-group-text">Item Image</label>
            <input
              type="file"
              className="form-control"
              value={itemImage}
              onChange={(e) => setItemImage(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </>
  );
}
