import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_URL;


const axiosInstance = axios.create({
  baseURL: backend,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

// 🔐 Automatically add Bearer token if available
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken'); // or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

// Optional: Add interceptors here (e.g. auth tokens, error logging)

export default axiosInstance;