import axiosInstance from '../config/axios';

export const authService = {
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