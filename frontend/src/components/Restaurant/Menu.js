// src/pages/RegisterRestaurant.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
 
  const [menu, setMenu] = useState([{ dishName: '', price: '', dishImage: '' }]);

  const navigate = useNavigate();

  const handleMenuChange = (index, e) => {
    const newMenu = [...menu];
    newMenu[index][e.target.name] = e.target.value;
    setMenu(newMenu);
  };

  const addMenuItem = () => {
    setMenu([...menu, { dishName: '', price: '', dishImage: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/Restaurant/menu', { 
      menu
    })
    .then((result) => {
      console.log(result);
      navigate('/Restaurant/login');
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
    <form onSubmit={handleSubmit}>
      
      {menu.map((item, index) => (
        <div key={index}>
          <input type="text" name="dishName" value={item.dishName} onChange={(e) => handleMenuChange(index, e)} placeholder="Dish Name" required />
          <input type="number" name="price" value={item.price} onChange={(e) => handleMenuChange(index, e)} placeholder="Price" required />
          <input type="text" name="dishImage" value={item.dishImage} onChange={(e) => handleMenuChange(index, e)} placeholder="Dish Image URL" required />
        </div>
      ))}
      <button type="button" onClick={addMenuItem}>Add Menu Item</button>

      <button type="submit">Register Restaurant</button>
    </form>
  );
};

export default Menu;
