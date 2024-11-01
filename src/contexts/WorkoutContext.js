import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/api';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.workouts.getAll();
      setWorkouts(response);
      setError(null);
    } catch (err) {
      setError('Failed to load workouts');
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await api.workouts.getSummary();
      setSummary(response.data);
      return response.data;
    } catch (err) {
      console.error('Error fetching summary:', err);
      return null;
    }
  }, []);

  const createWorkout = useCallback(async (workoutData) => {
    setLoading(true);
    try {
      const response = await api.workouts.create(workoutData);
      setWorkouts(prev => [...prev, response.data]);
      await fetchSummary();
      return { success: true, data: response.data };
    } catch (err) {
      setError('Failed to create workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchSummary]);

  const updateWorkout = useCallback(async (id, workoutData) => {
    setLoading(true);
    try {
      const response = await api.workouts.update(id, workoutData);
      setWorkouts(prev => 
        prev.map(workout => workout.id === id ? response.data : workout)
      );
      await fetchSummary();
      return { success: true, data: response.data };
    } catch (err) {
      setError('Failed to update workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchSummary]);

  const deleteWorkout = useCallback(async (id) => {
    setLoading(true);
    try {
      await api.workouts.delete(id);
      setWorkouts(prev => prev.filter(workout => workout.id !== id));
      await fetchSummary();
      return { success: true };
    } catch (err) {
      setError('Failed to delete workout');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [fetchSummary]);

  const value = {
    workouts,
    loading,
    error,
    summary,
    fetchWorkouts,
    fetchSummary,
    createWorkout,
    updateWorkout,
    deleteWorkout,
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};