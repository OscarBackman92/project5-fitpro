import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';

const LogWorkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    workout_type: 'cardio',
    date_logged: new Date().toISOString().split('T')[0],
    duration: '',
    notes: '',
    intensity: 'moderate'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call will be added later
      navigate('/workouts');
    } catch (err) {
      setError('Failed to log workout. Please try again.');
    } finally {
      setLoading(false);
    }
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
                value={formData.workout_type}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  workout_type: e.target.value
                }))}
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
                value={formData.date_logged}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  date_logged: e.target.value
                }))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  duration: e.target.value
                }))}
                required
                min="1"
                max="1440"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Intensity</Form.Label>
              <Form.Select
                value={formData.intensity}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  intensity: e.target.value
                }))}
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
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  notes: e.target.value
                }))}
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