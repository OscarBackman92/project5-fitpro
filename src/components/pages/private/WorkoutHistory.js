// src/components/pages/private/WorkoutHistory.js
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
import { useWorkouts } from '../../../contexts/WorkoutContext';
import { WORKOUT_TYPES, INTENSITY_LEVELS } from '../../../utils/constants';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { format } from 'date-fns';

const WorkoutHistory = () => {
  const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useWorkouts();
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    intensity: '',
    dateFrom: '',
    dateTo: ''
  });

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  useEffect(() => {
    let filtered = [...workouts];

    if (filters.type) {
      filtered = filtered.filter(w => w.workout_type === filters.type);
    }
    if (filters.intensity) {
      filtered = filtered.filter(w => w.intensity === filters.intensity);
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(w => w.date_logged >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter(w => w.date_logged <= filters.dateTo);
    }

    setFilteredWorkouts(filtered);
  }, [workouts, filters]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workout History</h2>
        <Button as={Link} to="/workouts/>
         <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workout History</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Log Workout
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Workout Type</Form.Label>
                <Form.Select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="">All Types</option>
                  {Object.entries(WORKOUT_TYPES).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Intensity</Form.Label>
                <Form.Select
                  value={filters.intensity}
                  onChange={(e) => setFilters({...filters, intensity: e.target.value})}
                >
                  <option value="">All Intensities</option>
                  {Object.entries(INTENSITY_LEVELS).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {filteredWorkouts.length === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <h4>No workouts found</h4>
            <p className="text-muted">Try adjusting your filters or add a new workout</p>
            <Button as={Link} to="/workouts/new" variant="primary">
              <FiPlus className="me-2" />
              Log Your First Workout
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Table responsive hover className="mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Intensity</th>
                <th>Calories</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkouts.map((workout) => (
                <tr key={workout.id}>
                  <td>{format(new Date(workout.date_logged), 'MMM dd, yyyy')}</td>
                  <td>{workout.workout_type_display}</td>
                  <td>{workout.duration} mins</td>
                  <td>
                    <span className={`badge bg-${
                      workout.intensity === 'high' ? 'danger' :
                      workout.intensity === 'moderate' ? 'warning' :
                      'success'
                    }`}>
                      {workout.intensity}
                    </span>
                  </td>
                  <td>{workout.calories}</td>
                  <td>
                    {workout.notes?.length > 30
                      ? `${workout.notes.substring(0, 30)}...`
                      : workout.notes}
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/workouts/${workout.id}`}
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                    >
                      <FiEdit2 />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(workout.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
};

export default WorkoutHistory;