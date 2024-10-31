import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://fitnessapi-d773a1148384.herokuapp.com';

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
    login: async (credentials) => {
      try {
        return await axiosInstance.post('/api/auth/login/', credentials);
      } catch (error) {
        throw error;
      }
    },
    register: async (userData) => {
      try {
        return await axiosInstance.post('/api/auth/register/', userData);
      } catch (error) {
        throw error;
      }
    },
    logout: async () => {
      try {
        return await axiosInstance.post('/api/auth/logout/');
      } catch (error) {
        throw error;
      }
    }
  },

  workouts: {
    getAll: async () => {
      try {
        const response = await axiosInstance.get('/api/workouts/');
        return {
          data: Array.isArray(response.data) ? response.data : []
        };
      } catch (error) {
        throw error;
      }
    },
    create: async (data) => {
      try {
        return await axiosInstance.post('/api/workouts/', data);
      } catch (error) {
        throw error;
      }
    },
    get: async (id) => {
      try {
        return await axiosInstance.get(`/api/workouts/${id}/`);
      } catch (error) {
        throw error;
      }
    },
    update: async (id, data) => {
      try {
        return await axiosInstance.patch(`/api/workouts/${id}/`, data);
      } catch (error) {
        throw error;
      }
    },
    delete: async (id) => {
      try {
        return await axiosInstance.delete(`/api/workouts/${id}/`);
      } catch (error) {
        throw error;
      }
    },
    getSummary: async () => {
      try {
        return await axiosInstance.get('/api/workouts/summary/');
      } catch (error) {
        throw error;
      }
    }
  },

  profile: {
    get: async () => {
      try {
        return await axiosInstance.get('/api/profiles/me/');
      } catch (error) {
        throw error;
      }
    },
    update: async (data) => {
      try {
        return await axiosInstance.patch('/api/profiles/me/', data);
      } catch (error) {
        throw error;
      }
    },
    updatePicture: async (file) => {
      try {
        const formData = new FormData();
        formData.append('profile_picture', file);
        return await axiosInstance.patch('/api/profiles/update_profile_picture/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }
};

export default api;