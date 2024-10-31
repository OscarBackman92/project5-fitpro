import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { api } from '../../../services/api';
import LoadingSpinner from '../../layout/LoadingSpinner';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [confirmation, setConfirmation] = useState({ show: false, workoutId: null });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await api.workouts.getAll();
      setWorkouts(response.data);
    } catch (err) {
      setError('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.workouts.delete(id);
      setWorkouts(workouts.filter(workout => workout.id !== id));
    } catch (err) {
      setError('Failed to delete workout');
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    if (filter === 'all') return true;
    return workout.workout_type === filter;
  });

  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date_logged) - new Date(a.date_logged);
    }
    return b[sortBy] - a[sortBy];
  });

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workout History</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Log New Workout
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Filter by Type</Form.Label>
            <Form.Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength Training</option>
              <option value="flexibility">Flexibility</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="duration">Duration</option>
              <option value="intensity">Intensity</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {sortedWorkouts.length === 0 ? (
        <Alert variant="info">
          No workouts found. 
          <Link to="/workouts/new" className="alert-link ms-2">Log your first workout!</Link>
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Intensity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedWorkouts.map(workout => (
              <tr key={workout.id}>
                <td>{new Date(workout.date_logged).toLocaleDateString()}</td>
                <td>{workout.workout_type_display}</td>
                <td>{workout.duration} min</td>
                <td>
                  <span 
                    className={`badge bg-${
                      workout.intensity === 'high' ? 'danger' : 
                      workout.intensity === 'moderate' ? 'warning' : 
                      'success'
                    }`}
                  >
                    {workout.intensity}
                  </span>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/workouts/${workout.id}`}
                    variant="info"
                    size="sm"
                    className="me-2"
                  >
                    <FiEdit2 />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this workout?')) {
                        handleDelete(workout.id);
                      }
                    }}
                  >
                    <FiTrash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default WorkoutHistory;