import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiList, FiGrid, FiPlus } from 'react-icons/fi';
import { api } from '../../../services/api';

const LogWorkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
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
    setSuccess(false);

    try {
      const workoutData = {
        ...formData,
        duration: parseInt(formData.duration, 10),
        calories: parseInt(formData.calories, 10)
      };
      
      await api.workouts.create(workoutData);
      setSuccess(true);
    } catch (err) {
      console.error('Error saving workout:', err);
      setError('Failed to save workout. Please try again.');
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

  if (success) {
    return (
      <Container>
        <Card>
          <Card.Body className="text-center">
            <h3 className="text-success mb-4">Workout Saved Successfully!</h3>
            <p>Where would you like to go next?</p>
            <ButtonGroup>
              <Button 
                variant="primary" 
                onClick={() => navigate('/dashboard')}
                className="me-2"
              >
                <FiGrid className="me-2" />
                Go to Dashboard
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/workouts')}
                className="me-2"
              >
                <FiList className="me-2" />
                View All Workouts
              </Button>
              <Button 
                variant="outline-primary" 
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    workout_type: 'cardio',
                    date_logged: new Date().toISOString().split('T')[0],
                    duration: '',
                    calories: '',
                    notes: '',
                    intensity: 'moderate'
                  });
                }}
              >
                <FiPlus className="me-2" />
                Log Another Workout
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      </Container>
    );
  }

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

            <Row>
              <Col md={6}>
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
              </Col>
            </Row>

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
                size="lg"
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