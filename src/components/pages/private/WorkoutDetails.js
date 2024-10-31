import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { api } from '../../../services/api';
import LoadingSpinner from '../../layout/LoadingSpinner';

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    workout_type: '',
    date_logged: '',
    duration: '',
    calories: '',
    notes: '',
    intensity: ''
  });

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      const response = await api.workouts.get(id);
      const workout = response.data;
      setFormData({
        workout_type: workout.workout_type,
        date_logged: workout.date_logged,
        duration: workout.duration,
        calories: workout.calories,
        notes: workout.notes || '',
        intensity: workout.intensity
      });
    } catch (err) {
      setError('Failed to load workout details');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const workoutData = {
        ...formData,
        duration: parseInt(formData.duration, 10),
        calories: parseInt(formData.calories, 10)
      };

      await api.workouts.update(id, workoutData);
      navigate('/workouts');
    } catch (err) {
      setError('Failed to update workout');
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await api.workouts.delete(id);
        navigate('/workouts');
      } catch (err) {
        setError('Failed to delete workout');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/workouts')}
            className="me-3 p-0"
          >
            <FiArrowLeft size={24} />
          </Button>
          <h2 className="mb-0">Edit Workout</h2>
        </div>
        <Button 
          variant="outline-danger" 
          onClick={handleDelete}
        >
          <FiTrash2 className="me-2" />
          Delete Workout
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
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
              </Col>

              <Col md={6}>
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
              </Col>
            </Row>

            <div className="d-flex justify-content-between">
              <Button 
                variant="secondary" 
                onClick={() => navigate('/workouts')}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={saving}
              >
                <FiSave className="me-2" />
                {saving ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default WorkoutDetails;