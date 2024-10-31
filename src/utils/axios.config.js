import axios from 'axios';
import { API_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          const validationErrors = error.response.data;
          let errorMessage = 'Validation Error: ';
          Object.keys(validationErrors).forEach(key => {
            errorMessage += `${key}: ${validationErrors[key].join(', ')}. `;
          });
          error.message = errorMessage;
          break;

        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          error.message = 'Please log in again.';
          break;

        case 403:
          error.message = 'You do not have permission to perform this action.';
          break;

        case 404:
          error.message = 'The requested resource was not found.';
          break;

        case 500:
          error.message = 'An internal server error occurred. Please try again later.';
          break;

        default:
          error.message = 'An error occurred. Please try again.';
      }
    } else if (error.request) {
      error.message = 'Network error. Please check your connection.';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;