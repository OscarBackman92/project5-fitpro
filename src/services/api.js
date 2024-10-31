import axiosInstance from '../utils/axios.config';

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