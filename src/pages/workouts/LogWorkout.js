// src/components/pages/private/LogWorkout.js
import React from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { useWorkoutForm } from '../../hooks/useWorkoutForm';
import { WORKOUT_TYPES, INTENSITY_LEVELS } from '../../utils/constants';

const LogWorkout = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useWorkoutForm();

  const onSubmit = async (e) => {
    const result = await handleSubmit(e);
    if (result.success) {
      navigate('/workouts');
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Log New Workout</h2>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {typeof error === 'string' ? error : 'Please check all required fields'}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Workout Type*</Form.Label>
              <Form.Select
                name="workout_type"
                value={formData.workout_type}
                onChange={handleChange}
                required
              >
                {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date*</Form.Label>
              <Form.Control
                type="date"
                name="date_logged"
                value={formData.date_logged}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes)*</Form.Label>
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
              <Form.Label>Calories Burned*</Form.Label>
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
              <Form.Label>Intensity*</Form.Label>
              <Form.Select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                required
              >
                {Object.entries(INTENSITY_LEVELS).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Add any additional details about your workout..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/workouts')}
                disabled={loading}
              >
                <FiX className="me-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
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