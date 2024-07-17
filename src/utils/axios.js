import axios from 'axios';

const authAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/auth`, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export { authAxios }