import axiosInstance from '../config/axios';

export const workoutService = {
  getAll: async () => {
    try {
      const response = await axiosInstance.get('/api/workouts/');
      return response.data;
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