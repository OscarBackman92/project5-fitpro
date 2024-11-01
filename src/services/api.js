// src/services/api.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    // Handle FormData requests properly
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    console.log('Request config:', config);
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
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // Add custom error message handling
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message ||
                        'An error occurred';
    error.message = errorMessage;

    return Promise.reject(error);
  }
);

// Auth methods
const authMethods = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/api/auth/login/', credentials);
      if (response.data.key) {
        localStorage.setItem('token', response.data.key);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      return await axiosInstance.post('/api/auth/register/', userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post('/api/auth/logout/');
      localStorage.removeItem('token');
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      return await axiosInstance.post('/api/auth/token/refresh/');
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }
};

// Profile methods
const profileMethods = {
  get: async () => {
    try {
      return await axiosInstance.get('/api/profiles/me/');
    } catch (error) {
      console.error('Profile get error:', error);
      throw error;
    }
  },

  update: async (data) => {
    try {
      return await axiosInstance.patch('/api/profiles/me/', data);
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  updatePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profile_picture', file);

      return await axiosInstance.patch(
        '/api/profiles/me/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 seconds for file uploads
        }
      );
    } catch (error) {
      console.error('Profile picture update error:', error);
      throw error;
    }
  }
};

// Workout methods
const workoutMethods = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/api/workouts/');
      return {
        data: Array.isArray(response.data) ? response.data : []
      };
    } catch (error) {
      console.error('Get workouts error:', error);
      throw error;
    }
  },

  get: async (id) => {
    try {
      return await axiosInstance.get(`/api/workouts/${id}/`);
    } catch (error) {
      console.error('Get workout error:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      return await axiosInstance.post('/api/workouts/', data);
    } catch (error) {
      console.error('Create workout error:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      return await axiosInstance.patch(`/api/workouts/${id}/`, data);
    } catch (error) {
      console.error('Update workout error:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await axiosInstance.delete(`/api/workouts/${id}/`);
    } catch (error) {
      console.error('Delete workout error:', error);
      throw error;
    }
  },

  getSummary: async () => {
    try {
      return await axiosInstance.get('/api/workouts/summary/');
    } catch (error) {
      console.error('Get workout summary error:', error);
      throw error;
    }
  }
};

// Social methods
const socialMethods = {
  getFollowers: async () => {
    try {
      return await axiosInstance.get('/api/follows/');
    } catch (error) {
      console.error('Get followers error:', error);
      throw error;
    }
  },

  follow: async (userId) => {
    try {
      return await axiosInstance.post('/api/follows/follow/', { user_id: userId });
    } catch (error) {
      console.error('Follow user error:', error);
      throw error;
    }
  },

  unfollow: async (userId) => {
    try {
      return await axiosInstance.post('/api/follows/unfollow/', { user_id: userId });
    } catch (error) {
      console.error('Unfollow user error:', error);
      throw error;
    }
  },

  getFeed: async () => {
    try {
      return await axiosInstance.get('/api/feed/');
    } catch (error) {
      console.error('Get feed error:', error);
      throw error;
    }
  },

  likeWorkout: async (workoutId) => {
    try {
      return await axiosInstance.post('/api/likes/', { workout: workoutId });
    } catch (error) {
      console.error('Like workout error:', error);
      throw error;
    }
  },

  unlikeWorkout: async (workoutId) => {
    try {
      return await axiosInstance.delete(`/api/likes/${workoutId}/`);
    } catch (error) {
      console.error('Unlike workout error:', error);
      throw error;
    }
  },

  commentOnWorkout: async (workoutId, content) => {
    try {
      return await axiosInstance.post('/api/comments/', {
        workout: workoutId,
        content
      });
    } catch (error) {
      console.error('Comment error:', error);
      throw error;
    }
  },

  deleteComment: async (commentId) => {
    try {
      return await axiosInstance.delete(`/api/comments/${commentId}/`);
    } catch (error) {
      console.error('Delete comment error:', error);
      throw error;
    }
  }
};

// Helper functions
const getErrorMessage = (error) => {
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

// Export the API service
export const api = {
  auth: authMethods,
  profile: profileMethods,
  workouts: workoutMethods,
  social: socialMethods
};

export { getErrorMessage };
export default api;