import { useState, useCallback } from 'react';
import { api } from '../../services/api';

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.workouts.getAll();
      console.log('Fetched workouts:', response.data);
      setWorkouts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching workouts:', err);
      setError('Failed to load workouts');
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkout = useCallback(async (workoutData) => {
    setLoading(true);
    try {
      const response = await api.workouts.create(workoutData);
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
      const response = await api.workouts.update(id, workoutData);
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
      await api.workouts.delete(id);
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

  const getSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.workouts.getSummary();
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error fetching workout summary:', err);
      setError('Failed to load workout summary');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    workouts,
    loading,
    error,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getSummary,
    clearError
  };
};

export default useWorkouts;