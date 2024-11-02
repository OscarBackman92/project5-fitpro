import axios from 'axios';
import { API_URL } from '../../utils/constants';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    config.params = {
      ...config.params,
      _t: Date.now()
    };

    if (process.env.NODE_ENV === 'development') {
      console.log('Request Config:', config);
    }

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', response);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (process.env.NODE_ENV === 'development') {
      console.error('Response error:', error.response || error);
    }

    if (error.response?.status === 503 && !originalRequest._retry) {
      originalRequest._retry = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      return axiosInstance(originalRequest);
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('Authentication required'));
    }

    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.'
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;