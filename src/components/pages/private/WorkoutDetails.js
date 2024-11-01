// src/components/pages/private/WorkoutDetails.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiTrash2, FiArrowLeft, FiClock, FiFire, FiActivity } from 'react-icons/fi';
import { useWorkouts } from '../../../hooks/useWorkouts';
import { WORKOUT_TYPES, INTENSITY_LEVELS } from '../../../utils/constants';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { format } from 'date-fns';

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workouts, updateWorkout, deleteWorkout } = useWorkouts();
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
    const workout = workouts.find(w => w.id === parseInt(id));
    if (workout) {
      setFormData({
        workout_type: workout.workout_type,
        date_logged: workout.date_logged,
        duration: workout.duration,
        calories: workout.calories,
        notes: workout.notes || '',
        intensity: workout.intensity
      });
      setLoading(false);
    }
  }, [id, workouts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

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
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const result = await deleteWorkout(id);
        if (result.success) {
          navigate('/workouts');
        } else {
          setError(result.error);
        }
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

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Workout Type</Form.Label>
                  <Form.Select
                    name="workout_type"
                    value={formData.workout_type}
                    onChange={(e) => setFormData({
                      ...formData,
                      workout_type: e.target.value
                    })}
                    required
                  >
                    {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
                      <option key={key} value={value}>{key}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date_logged"
                        value={formData.date_logged}
                        onChange={(e) => setFormData({
                          ...formData,
                          date_logged: e.target.value
                        })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Intensity</Form.Label>
                      <Form.Select
                        name="intensity"
                        value={formData.intensity}
                        onChange={(e) => setFormData({
                          ...formData,
                          intensity: e.target.value
                        })}
                        required
                      >
                        {Object.entries(INTENSITY_LEVELS).map(([key, value]) => (
                          <option key={key} value={value}>{key}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Duration (minutes)</Form.Label>
                      <Form.Control
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({
                          ...formData,
                          duration: e.target.value
                        })}
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
                        onChange={(e) => setFormData({
                          ...formData,
                          calories: e.target.value
                        })}
                        required
                        min="0"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"<Form.Control
                    as="textarea"
                    name="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({
                      ...formData,
                      notes: e.target.value
                    })}
                    rows={3}
                    placeholder="Add any additional details about your workout..."
                  />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/workouts')}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saving}
                >
                  <FiSave className="me-2" />
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col lg={4}>
        <Card className="mb-4">
          <Card.Body>
            <h5 className="card-title mb-4">Workout Summary</h5>
            
            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                <FiActivity className="text-primary" size={24} />
              </div>
              <div>
                <small className="text-muted d-block">Workout Type</small>
                <strong>{WORKOUT_TYPES[formData.workout_type] || formData.workout_type}</strong>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                <FiClock className="text-success" size={24} />
              </div>
              <div>
                <small className="text-muted d-block">Duration</small>
                <strong>{formData.duration} minutes</strong>
              </div>
            </div>

            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                <FiFire className="text-danger" size={24} />
              </div>
              <div>
                <small className="text-muted d-block">Calories Burned</small>
                <strong>{formData.calories} calories</strong>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <h5 className="card-title mb-4">History</h5>
            <div className="mb-3">
              <small className="text-muted d-block">Created</small>
              <strong>{format(new Date(formData.date_logged), 'MMMM d, yyyy')}</strong>
            </div>
            <div className="mb-3">
              <small className="text-muted d-block">Last Modified</small>
              <strong>{format(new Date(), 'MMMM d, yyyy')}</strong>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);
};

export default WorkoutDetails;