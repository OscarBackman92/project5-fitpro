import axios from 'axios';

const BASE_URL = 'https://fitnessapi-d773a1148384.herokuapp.com';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
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

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: (credentials) => axiosInstance.post('/api/auth/login/', credentials),
    register: (userData) => axiosInstance.post('/api/auth/register/', userData),
    logout: () => axiosInstance.post('/api/auth/logout/'),
  },
  profile: {
    get: () => axiosInstance.get('/api/profiles/me/'),
    update: (data) => {
      if (data instanceof FormData) {
        return axiosInstance.patch('/api/profiles/me/', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      return axiosInstance.patch('/api/profiles/me/', data);
    },
    updatePicture: (file) => {
      const formData = new FormData();
      formData.append('profile_picture', file);
      return axiosInstance.patch('/api/profiles/update_profile_picture/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
  workouts: {
    getAll: () => axiosInstance.get('/api/workouts/'),
    get: (id) => axiosInstance.get(`/api/workouts/${id}/`),
    create: (data) => axiosInstance.post('/api/workouts/', data),
    update: (id, data) => axiosInstance.patch(`/api/workouts/${id}/`, data),
    delete: (id) => axiosInstance.delete(`/api/workouts/${id}/`),
    getSummary: () => axiosInstance.get('/api/workouts/summary/'),
  },
};

// Error handling helper
export const getErrorMessage = (error) => {
  if (error.response?.data) {
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
    if (typeof error.response.data === 'object') {
      return Object.values(error.response.data)[0];
    }
  }
  return 'An error occurred. Please try again.';
};