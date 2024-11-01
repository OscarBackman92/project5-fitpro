import { useState, useCallback } from 'react';
import axiosInstance from '../api/axios.config';

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);  // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/workouts/');
      // Check if response.data is an array, if not, check for results property
      const workoutData = Array.isArray(response.data) 
        ? response.data 
        : response.data.results || [];
      setWorkouts(workoutData);
      setError(null);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Failed to load workouts');
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add fetchSummary function
  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/workouts/summary/');
      return response.data;
    } catch (err) {
      setError('Failed to load summary');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkout = useCallback(async (workoutData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/workouts/', workoutData);
      setWorkouts(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error creating workout:', err);
      setError('Failed to create workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWorkout = useCallback(async (id, workoutData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/workouts/${id}/`, workoutData);
      setWorkouts(prev => 
        prev.map(workout => workout.id === id ? response.data : workout)
      );
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating workout:', err);
      setError('Failed to update workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteWorkout = useCallback(async (id) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/workouts/${id}/`);
      setWorkouts(prev => prev.filter(workout => workout.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting workout:', err);
      setError('Failed to delete workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    workouts,
    loading,
    error,
    fetchWorkouts,
    fetchSummary,
    createWorkout,
    updateWorkout,
    deleteWorkout
  };
};

export default useWorkouts;