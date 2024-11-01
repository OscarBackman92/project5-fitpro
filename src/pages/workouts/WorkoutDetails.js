// src/components/pages/private/WorkoutDetails.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useWorkouts } from '../../hooks/useWorkouts';
import { WORKOUT_TYPES } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, updateWorkout, deleteWorkout } = useWorkouts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    workout_type: '',
    date_logged: '',
    duration: '',
    calories: ''
  });

  useEffect(() => {
    const workout = workouts.find(w => w.id === parseInt(id));
    if (workout) {
      setFormData({
        workout_type: workout.workout_type,
        date_logged: workout.date_logged,
        duration: workout.duration,
        calories: workout.calories
      });
      setLoading(false);
    }
  }, [id, workouts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateWorkout(id, {
        ...formData,
        duration: parseInt(formData.duration),
        calories: parseInt(formData.calories)
      });

      if (result.success) {
        navigate('/workouts');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update workout');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this workout?')) {
      try {
        await deleteWorkout(id);
        navigate('/workouts');
      } catch (err) {
        setError('Failed to delete workout');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Button variant="link" onClick={() => navigate('/workouts')} className="me-2">
            <FiArrowLeft />
          </Button>
          <h2 className="mb-0">Edit Workout</h2>
        </div>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Workout Type</Form.Label>
          <Form.Select
            value={formData.workout_type}
            onChange={(e) => setFormData({...formData, workout_type: e.target.value})}
            required
          >
            {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.date_logged}
            onChange={(e) => setFormData({...formData, date_logged: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            required
            min="1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Calories Burned</Form.Label>
          <Form.Control
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({...formData, calories: e.target.value})}
            required
            min="0"
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate('/workouts')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default WorkoutDetails;