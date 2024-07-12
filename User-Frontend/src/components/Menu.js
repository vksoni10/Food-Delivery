import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu({ restaurantId }) {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/Restaurant/${restaurantId}/menuItems`)
            .then(response => {
                setMenuItems(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
            });
    }, [restaurantId]);

    const handleAddToCart = (itemId) => {
        setCart(prevCart => ({
            ...prevCart,
            [itemId]: (prevCart[itemId] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (itemId) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId];
            }
            return updatedCart;
        });
    };

    return (
        <div>
            <h2>Menu Items</h2>
            <table className="menu-table">
                <thead>
                    <tr>
                        {/* <th>Image</th> */}
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item._id}>
                            {/* <td><img src={item.dishImage} alt={item.dishName} style={{width: "100px"}} /></td> */}
                            <td>{item.dishName}</td>
                            <td>${item.price}</td>
                            <td>
                                {cart[item._id] ? (
                                    <div className="cart-actions">
                                        <button onClick={() => handleRemoveFromCart(item._id)}>-</button>
                                        <span>{cart[item._id]}</span>
                                        <button onClick={() => handleAddToCart(item._id)}>+</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleAddToCart(item._id)}>ADD</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Menu;
