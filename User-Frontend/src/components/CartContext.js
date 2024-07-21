// CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const token = localStorage.getItem('token');

    const fetchCartItems = async () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            try {
                const response = await axios.get('http://localhost:3001/cart/get-cart-items', {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartCount(response.data.cart.totalQuantity);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [token]);

    const handleAddToCart = async (item, resId, email) => {
        try {
            const response = await axios.post('http://localhost:3001/cart/add-to-cart', {
                resId,
                dishName: item.dishName,
                email,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(`Item added successfully`, {
                autoClose: 1000,
            });
            fetchCartItems(); // Refresh the cart items after adding
        } catch (error) {
            toast.error(`Error adding item to cart: ${error.message}`);
        }
    };

    return (
        <CartContext.Provider value={{ cartCount, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    );
};
