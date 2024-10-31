import React, { createContext, useContext } from 'react';
import useWorkouts from '../hooks/useWorkouts';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const workouts = useWorkouts();

  return (
    <WorkoutContext.Provider value={workouts}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }
  return context;
};