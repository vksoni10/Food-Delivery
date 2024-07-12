// src/components/MenuItemList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Menu({ restaurantId }) {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/Restaurant/${restaurantId}/menuItems`)
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, [restaurantId]);

    return (
        <div>
            <h2>Menu Items</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item._id}>
                        {/* <img src={item.dishImage} al
                        t={item.dishName} style={{width: "100px"}} /> */}
                        <h3>{item.dishName}</h3>
                        <p>${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
