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

// Error handler helper
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = error.response.data?.detail || 
                        error.response.data?.message || 
                        'An error occurred';
    throw new Error(errorMessage);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Error setting up the request');
  }
};

export const api = {
  auth: {
    login: async (credentials) => {
      try {
        return await axiosInstance.post('/api/auth/login/', credentials);
      } catch (error) {
        handleError(error);
      }
    },
    register: async (userData) => {
      try {
        return await axiosInstance.post('/api/auth/register/', userData);
      } catch (error) {
        handleError(error);
      }
    },
    logout: async () => {
      try {
        return await axiosInstance.post('/api/auth/logout/');
      } catch (error) {
        handleError(error);
      }
    }
  },

  profile: {
    get: async () => {
      try {
        return await axiosInstance.get('/api/profiles/me/');
      } catch (error) {
        handleError(error);
      }
    },
    update: async (data) => {
      try {
        const config = data instanceof FormData ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        } : {};
        return await axiosInstance.patch('/api/profiles/me/', data, config);
      } catch (error) {
        handleError(error);
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
        handleError(error);
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
        console.error('Error fetching workouts:', error);
        handleError(error);
      }
    },
    get: async (id) => {
      try {
        return await axiosInstance.get(`/api/workouts/${id}/`);
      } catch (error) {
        handleError(error);
      }
    },
    create: async (data) => {
      try {
        return await axiosInstance.post('/api/workouts/', data);
      } catch (error) {
        handleError(error);
      }
    },
    update: async (id, data) => {
      try {
        return await axiosInstance.patch(`/api/workouts/${id}/`, data);
      } catch (error) {
        handleError(error);
      }
    },
    delete: async (id) => {
      try {
        return await axiosInstance.delete(`/api/workouts/${id}/`);
      } catch (error) {
        handleError(error);
      }
    },
    getSummary: async () => {
      try {
        return await axiosInstance.get('/api/workouts/summary/');
      } catch (error) {
        handleError(error);
      }
    }
  },

  // Optional: Social features if you want to implement them later
  social: {
    getFollowers: async () => {
      try {
        return await axiosInstance.get('/api/follows/');
      } catch (error) {
        handleError(error);
      }
    },
    follow: async (userId) => {
      try {
        return await axiosInstance.post('/api/follows/follow/', { user_id: userId });
      } catch (error) {
        handleError(error);
      }
    },
    unfollow: async (userId) => {
      try {
        return await axiosInstance.post('/api/follows/unfollow/', { user_id: userId });
      } catch (error) {
        handleError(error);
      }
    },
    getFeed: async () => {
      try {
        return await axiosInstance.get('/api/feed/');
      } catch (error) {
        handleError(error);
      }
    }
  }
};

// Helper for extracting error messages
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