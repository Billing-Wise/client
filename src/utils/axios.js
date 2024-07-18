import axios from 'axios';

// 인증/인가 관련 API
const authAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

authAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

// 일반 API
const mainAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

mainAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data;
  }
);

export { authAxios, mainAxios }