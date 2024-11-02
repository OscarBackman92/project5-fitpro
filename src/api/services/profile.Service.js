import axiosInstance from '../config/axios';

export const profileService = {
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
      if (!file) {
        throw new Error('No file provided');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size should be less than 5MB');
      }

      const formData = new FormData();
      formData.append('profile_picture', file);

      const maxRetries = 3;
      const makeRequest = async (attempt) => {
        try {
          return await axiosInstance.patch(
            '/api/profiles/me/',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              timeout: 30000,
              maxContentLength: 5242880,
              maxBodyLength: 5242880
            }
          );
        } catch (err) {
          if (attempt < maxRetries - 1) {
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
            return makeRequest(attempt + 1);
          }
          throw err;
        }
      };

      return await makeRequest(0);

    } catch (error) {
      console.error('Profile picture update error:', error);
      
      if (error.response?.status === 503) {
        throw new Error('Service is temporarily unavailable. Please try again later.');
      }
      
      if (!error.response && error.message === 'Network Error') {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      throw error.response?.data?.message || error.message || 'Failed to update profile picture';
    }
  }
};