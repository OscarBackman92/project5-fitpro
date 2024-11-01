import { useCallback } from 'react';
import axiosInstance from '../utils/api.config';
import { useApi } from './useApi';

export const useWorkouts = () => {
  const { 
    data: workouts = [], 
    loading, 
    error,
    execute: fetchWorkouts,
    setData: setWorkouts 
  } = useApi('/api/workouts/', {
    immediate: true
  });

  const createWorkout = useCallback(async (workoutData) => {
    try {
      const response = await axiosInstance.post('/api/workouts/', workoutData);
      setWorkouts(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [setWorkouts]);

  const updateWorkout = useCallback(async (id, workoutData) => {
    try {
      const response = await axiosInstance.patch(`/api/workouts/${id}/`, workoutData);
      setWorkouts(prev => 
        prev.map(workout => workout.id === id ? response.data : workout)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [setWorkouts]);

  const deleteWorkout = useCallback(async (id) => {
    try {
      await axiosInstance.delete(`/api/workouts/${id}/`);
      setWorkouts(prev => prev.filter(workout => workout.id !== id));
    } catch (error) {
      throw error;
    }
  }, [setWorkouts]);

  return {
    workouts,
    loading,
    error,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    refreshWorkouts: fetchWorkouts
  };
};

export default useWorkouts;