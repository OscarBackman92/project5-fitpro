import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';
import { api } from '../../../services/api';

const LogWorkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    workout_type: 'cardio',
    date_logged: new Date().toISOString().split('T')[0],
    duration: '',
    calories: '',
    notes: '',
    intensity: 'moderate'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting workout data:', formData); // Debug log
      
      // Format the data
      const workoutData = {
        ...formData,
        duration: parseInt(formData.duration, 10),
        calories: parseInt(formData.calories, 10)
      };

      // Get the token
      const token = localStorage.getItem('token');
      console.log('Auth token:', token); // Debug log

      const response = await api.workouts.create(workoutData);
      console.log('Workout created:', response.data); // Debug log
      
      navigate('/workouts');
    } catch (err) {
      console.error('Error creating workout:', err);
      setError(err.response?.data?.message || 'Failed to save workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container>
      <h2 className="mb-4">Log New Workout</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Type</Form.Label>
              <Form.Select
                name="workout_type"
                value={formData.workout_type}
                onChange={handleChange}
                required
              >
                <option value="cardio">Cardio</option>
                <option value="strength">Strength Training</option>
                <option value="flexibility">Flexibility</option>
                <option value="sports">Sports</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date_logged"
                value={formData.date_logged}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                max="1440"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Calories Burned</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                required
                min="0"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Intensity</Form.Label>
              <Form.Select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any additional details about your workout..."
              />
            </Form.Group>

            <div className="d-grid">
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                <FiSave className="me-2" />
                {loading ? 'Saving...' : 'Save Workout'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LogWorkout;