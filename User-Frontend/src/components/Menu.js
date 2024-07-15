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
            <div className="menu-list">
                {menuItems.map(item => (
                    <div className="menu-item" key={item._id}>
                        <div className="item-details">
                            <span className="item-name">{item.dishName}</span>
                            <span className="item-price">${item.price}</span>
                        </div>
                        <div className="cart-actions">
                            {cart[item._id] ? (
                                <div className="cart-actions">
                                    <button onClick={() => handleRemoveFromCart(item._id)}>-</button>
                                    <span>{cart[item._id]}</span>
                                    <button onClick={() => handleAddToCart(item._id)}>+</button>
                                </div>
                            ) : (
                                <button onClick={() => handleAddToCart(item._id)}>ADD</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
