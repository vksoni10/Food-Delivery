import axios from "axios";
import { useEffect, useState , createContext, useNavigate} from "react";
import { jwtDecode } from 'jwt-decode';
export const DataProvider = createContext()

export default function DataContext({children}){

    const [count, setCount] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const token = localStorage.getItem('token');
  
  
    const navigate = useNavigate();
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
  
    useEffect(() => {
      const token = localStorage.getItem('token');
   
  
    
})
    
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsed = await axios.get('http://localhost:3001/cart/get-cart-items', {
                  params: { userId },
                  headers: { Authorization: `Bearer ${token}` }
                });
                setCartCount(responsed.data.cart.totalQuantity);
                
              } catch (error) {
                console.error('Error fetching cart items:', error);
              }        }

        fetchData()
    }, [])




    return(

<>
<DataProvider.Provider value={count}>
    {children}
</DataProvider.Provider>
</>


    )
}

