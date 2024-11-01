// src/services/api.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
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

    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
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
    login: async (credentials) => {
      const response = await axiosInstance.post('/api/auth/login/', credentials);
      if (response.data.key) {
        localStorage.setItem('token', response.data.key);
      }
      return response;
    },

    register: async (userData) => {
      return await axiosInstance.post('/api/auth/register/', userData);
    },

    logout: async () => {
      const response = await axiosInstance.post('/api/auth/logout/');
      localStorage.removeItem('token');
      return response;
    }
  },

  profile: {
    get: async () => {
      return await axiosInstance.get('/api/profiles/me/');
    },

    update: async (data) => {
      return await axiosInstance.patch('/api/profiles/me/', data);
    },

    updatePicture: async (file) => {
      const formData = new FormData();
      formData.append('profile_picture', file);
      return await axiosInstance.patch('/api/profiles/me/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  },

  workouts: {
    getAll: async () => {
      const response = await axiosInstance.get('/api/workouts/');
      return response.data;
    },

    get: async (id) => {
      return await axiosInstance.get(`/api/workouts/${id}/`);
    },

    create: async (data) => {
      return await axiosInstance.post('/api/workouts/', data);
    },

    update: async (id, data) => {
      return await axiosInstance.patch(`/api/workouts/${id}/`, data);
    },

    delete: async (id) => {
      return await axiosInstance.delete(`/api/workouts/${id}/`);
    },

    getSummary: async () => {
      return await axiosInstance.get('/api/workouts/summary/');
    }
  },

  social: {
    getFeed: async () => {
      return await axiosInstance.get('/api/feed/');
    },

    follow: async (userId) => {
      return await axiosInstance.post('/api/follows/follow/', { user_id: userId });
    },

    unfollow: async (userId) => {
      return await axiosInstance.post('/api/follows/unfollow/', { user_id: userId });
    },

    likeWorkout: async (workoutId) => {
      return await axiosInstance.post('/api/likes/', { workout: workoutId });
    },

    unlikeWorkout: async (workoutId) => {
      return await axiosInstance.delete(`/api/likes/${workoutId}/`);
    }
  }
};

export const getErrorMessage = (error) => {
  if (error.response?.data) {
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
    if (typeof error.response.data === 'object') {
      return Object.values(error.response.data)[0];
    }
  }
  return error.message || 'An error occurred';
};

export default api;