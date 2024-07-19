import axios from "axios";
import { useEffect, useState, createContext } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

export const DataProvider = createContext();

export default function DataContext({ children }) {
    const [count, setCount] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const token = localStorage.getItem('token');

    let userId = null;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.id;
    } else {
        // Handle the case where the token is not available
        console.error('No token found');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/cart/get-cart-items', {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCartCount(response.data.cart.totalQuantity);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId, token]);

    return (
        <DataProvider.Provider value={{ count, cartCount, setCount, setCartCount }}>
            {children}
        </DataProvider.Provider>
    );
}
