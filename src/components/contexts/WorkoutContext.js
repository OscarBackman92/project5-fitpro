// src/contexts/WorkoutContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../services/api';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.workouts.getAll();
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addWorkout = useCallback(async (workoutData) => {
    try {
      const response = await api.workouts.create(workoutData);
      setWorkouts(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  }, []);

  const updateWorkout = useCallback(async (id, workoutData) => {
    try {
      const response = await api.workouts.update(id, workoutData);
      setWorkouts(prev => prev.map(workout => 
        workout.id === id ? response.data : workout
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating workout:', error);
      throw error;
    }
  }, []);

  const deleteWorkout = useCallback(async (id) => {
    try {
      await api.workouts.delete(id);
      setWorkouts(prev => prev.filter(workout => workout.id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw error;
    }
  }, []);

  const value = {
    workouts,
    loading,
    fetchWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout
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