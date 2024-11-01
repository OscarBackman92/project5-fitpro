// src/hooks/useWorkoutForm.js
import { useState, useCallback } from 'react';
import { useWorkouts } from '../hooks/useWorkouts';
import { WORKOUT_TYPES, INTENSITY_LEVELS } from '../../utils/constants';

export const useWorkoutForm = (initialData = null) => {
  const { createWorkout, updateWorkout } = useWorkouts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    workout_type: initialData?.workout_type || WORKOUT_TYPES.CARDIO,
    date_logged: initialData?.date_logged || new Date().toISOString().split('T')[0],
    duration: initialData?.duration || '',
    calories: initialData?.calories || '',
    intensity: initialData?.intensity || INTENSITY_LEVELS.MODERATE,
    notes: initialData?.notes || ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.workout_type) errors.workout_type = 'Workout type is required';
    if (!formData.date_logged) errors.date_logged = 'Date is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (formData.duration <= 0) errors.duration = 'Duration must be greater than 0';
    if (!formData.calories) errors.calories = 'Calories is required';
    if (formData.calories < 0) errors.calories = 'Calories cannot be negative';
    if (!formData.intensity) errors.intensity = 'Intensity is required';
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { isValid, errors } = validateForm();
    if (!isValid) {
      setError(errors);
      setLoading(false);
      return { success: false, errors };
    }

    try {
      const workoutData = {
        ...formData,
        duration: parseInt(formData.duration),
        calories: parseInt(formData.calories)
      };

      if (initialData?.id) {
        return await updateWorkout(initialData.id, workoutData);
      } else {
        return await createWorkout(workoutData);
      }
    } catch (err) {
      setError('Failed to save workout');
      return { success: false, error: 'Failed to save workout' };
    } finally {
      setLoading(false);
    }
  }, [formData, initialData, createWorkout, updateWorkout, validateForm]);

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    setFormData
  };
};