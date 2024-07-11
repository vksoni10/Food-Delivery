// userApi.js
import jwtDecode from 'jwt-decode';

export const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        const { name, email, mobile, addresses } = decoded;
        return { name, email, mobile, addresses };
    }
    return null;
};
