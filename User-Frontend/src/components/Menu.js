import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu({ restaurantId }) {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

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

    const filteredItems = menuItems.filter(item => 
        item.dishName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Menu Items</h2>
            <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <div className="menu-list">
                {filteredItems.map(item => (
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
