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
    console.log('Request Headers:', config.headers); // Debug log
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Handle response errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    
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
        return await axiosInstance.post('/api/auth/logout/');
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    }
  },

  profile: {
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
        const config = data instanceof FormData ? {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        } : {};
        return await axiosInstance.patch('/api/profiles/me/', data, config);
      } catch (error) {
        console.error('Profile update error:', error);
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
        console.error('Profile picture update error:', error);
        throw error;
      }
    }
  },

  workouts: {
    getAll: async () => {
      try {
        const response = await axiosInstance.get('/api/workouts/');
        console.log('Workouts response:', response); // Debug log
        return response;
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
        console.log('Creating workout with data:', data); // Debug log
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
  },

  social: {
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
    like: async (workoutId) => {
      try {
        return await axiosInstance.post('/api/likes/', { workout: workoutId });
      } catch (error) {
        console.error('Like workout error:', error);
        throw error;
      }
    },
    unlike: async (workoutId) => {
      try {
        return await axiosInstance.delete(`/api/likes/${workoutId}/`);
      } catch (error) {
        console.error('Unlike workout error:', error);
        throw error;
      }
    },
    comment: async (workoutId, content) => {
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
  }
};

export default api;