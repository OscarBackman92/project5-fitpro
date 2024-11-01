import axiosInstance from '../utils/axios.config';

class WorkoutService {
  async getAll() {
    try {
      const response = await axiosInstance.get('/api/workouts/');
      console.log('Raw workout data:', response.data);
      return {
        data: Array.isArray(response.data) ? response.data : []
      };
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw this.handleError(error);
    }
  }

  async getById(id) {
    try {
      const response = await axiosInstance.get(`/api/workouts/${id}/`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(workoutData) {
    try {
      const response = await axiosInstance.post('/api/workouts/', workoutData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(id, workoutData) {
    try {
      const response = await axiosInstance.patch(`/api/workouts/${id}/`, workoutData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(id) {
    try {
      await axiosInstance.delete(`/api/workouts/${id}/`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getSummary() {
    try {
      const response = await axiosInstance.get('/api/workouts/summary/');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getStats(params = {}) {
    try {
      const response = await axiosInstance.get('/api/workouts/stats/', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Helper method to format workout data before sending to API
  formatWorkoutData(data) {
    return {
      workout_type: data.workoutType,
      date_logged: data.dateLogged,
      duration: parseInt(data.duration, 10),
      calories: parseInt(data.calories, 10),
      intensity: data.intensity,
      notes: data.notes || ''
    };
  }

  // Helper method to standardize error handling
  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const message = error.response.data?.detail || 
                     error.response.data?.message || 
                     'An error occurred processing your request';
      
      return new Error(message);
    } else if (error.request) {
      // The request was made but no response was received
      return new Error('No response received from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      return new Error('Error setting up the request. Please try again.');
    }
  }

  // Utility method to validate workout data
  validateWorkout(data) {
    const errors = {};

    if (!data.workout_type) {
      errors.workout_type = 'Workout type is required';
    }

    if (!data.date_logged) {
      errors.date_logged = 'Date is required';
    }

    if (!data.duration || data.duration <= 0) {
      errors.duration = 'Duration must be greater than 0';
    }

    if (!data.calories || data.calories < 0) {
      errors.calories = 'Calories must be 0 or greater';
    }

    if (!data.intensity) {
      errors.intensity = 'Intensity is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Method to format date for consistency
  formatDate(date) {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  // Method to calculate workout metrics
  calculateMetrics(workouts) {
    if (!Array.isArray(workouts) || workouts.length === 0) {
      return {
        totalWorkouts: 0,
        totalDuration: 0,
        totalCalories: 0,
        averageDuration: 0,
        averageCalories: 0
      };
    }

    const metrics = workouts.reduce((acc, workout) => {
      acc.totalWorkouts++;
      acc.totalDuration += workout.duration;
      acc.totalCalories += workout.calories;
      return acc;
    }, {
      totalWorkouts: 0,
      totalDuration: 0,
      totalCalories: 0
    });

    metrics.averageDuration = Math.round(metrics.totalDuration / metrics.totalWorkouts);
    metrics.averageCalories = Math.round(metrics.totalCalories / metrics.totalWorkouts);

    return metrics;
  }
}

// Export a singleton instance
export const workoutService = new WorkoutService();