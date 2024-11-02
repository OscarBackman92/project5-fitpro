import axios from 'axios';
import { config } from '../config/environment';

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: config.apiTimeout,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    // For FormData requests
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Request:', {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data
      });
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
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  async (error) => {
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Response error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }

    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('CORS or Authentication error:', error.response);
          break;
        case 503:
          console.error('Service Unavailable - API might be down');
          return Promise.reject(new Error('Service is temporarily unavailable. Please try again later.'));
        default:
          // Handle other status codes as needed
          break;
      }
    }

    // Network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;