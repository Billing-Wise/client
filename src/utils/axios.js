import { useAuthStore } from '@/stores/auth';
import { useErrorHandleStore } from '@/stores/error/errorHandle';
import axios from 'axios';

// 인증, 인가 관련 API
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
  async (error) => {
    if (error.code === 'ERR_NETWORK'  ) {
      const errorHandleStore = useErrorHandleStore();
      errorHandleStore.setServerError(true);
      // 잘못된 토큰
    } else if (error.response.data.code === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      // 만료된 엑세스 토큰
    } else if (error.response.data.code === 419) {
      await mainAxios.post('auth/reissue')
      return await mainAxios(error.config);
      // 존재하지 않는 데이터
    } else if (error.response.data.code === 404) {
      const errorHandleStore = useErrorHandleStore();
      errorHandleStore.setNotFound(true);
      // 권한이 없는 접근
    } else if (error.response.data.code === 403) {
      const errorHandleStore = useErrorHandleStore();
      errorHandleStore.setNotAuthorized(true);
    } else {
    // 그 외의 예외
      return error.response.data;
    }
  }
);

// 파일 API
const fileAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, 
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
})

fileAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // 잘못된 토큰
    if (error.response.data.code === 401) {
      const authStore = useAuthStore();
      authStore.logout();
    // 만료된 엑세스 토큰
    } else if (error.response.data.code === 419) {
      await mainAxios.post('auth/reissue')
      return await mainAxios(error.config);
    // 그 외의 예외
    } else {
      return error.response.data;
    }
  }
);


// 회원 관련 axios
const memberAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export { authAxios, mainAxios, fileAxios, memberAxios }