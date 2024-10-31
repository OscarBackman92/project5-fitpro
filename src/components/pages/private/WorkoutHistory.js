import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Alert, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiFilter } from 'react-icons/fi';
import { api } from '../../../services/api';
import LoadingSpinner from '../../layout/LoadingSpinner';
import ErrorBoundary from '../../common/ErrorBoundary';
import { WORKOUT_TYPES } from '../../../utils/constants';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    sortBy: 'date'
  });

  const fetchWorkouts = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    try {
      const response = await api.workouts.getAll();
      setWorkouts(Array.isArray(response.data) ? response.data : []);
      setError('');
    } catch (err) {
      setError('Failed to load workouts. Please try again.');
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) return;
    
    try {
      await api.workouts.delete(id);
      setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
    } catch (err) {
      setError('Failed to delete workout. Please try again.');
    }
  };

  const filteredWorkouts = workouts.filter(workout => {
    if (filters.type !== 'all' && workout.workout_type !== filters.type) return false;
    
    if (filters.dateRange !== 'all') {
      const workoutDate = new Date(workout.date_logged);
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      
      if (filters.dateRange === 'month' && workoutDate < thirtyDaysAgo) return false;
      if (filters.dateRange === 'week' && workoutDate < new Date(today - 7 * 24 * 60 * 60 * 1000)) return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'date':
        return new Date(b.date_logged) - new Date(a.date_logged);
      case 'duration':
        return b.duration - a.duration;
      case 'intensity':
        return a.intensity.localeCompare(b.intensity);
      default:
        return 0;
    }
  });

  if (loading) return <LoadingSpinner />;

  return (
    <ErrorBoundary>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Workout History</h2>
          <div>
            <Button 
              variant="outline-secondary" 
              onClick={() => fetchWorkouts(true)} 
              className="me-2"
              disabled={refreshing}
            >
              <FiRefreshCw className={`me-2 ${refreshing ? 'spin' : ''}`} />
              Refresh
            </Button>
            <Button as={Link} to="/workouts/new" variant="primary">
              <FiPlus className="me-2" />
              Log New Workout
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}

        <Card className="mb-4">
          <Card.Header>
            <div className="d-flex align-items-center">
              <FiFilter className="me-2" />
              <span>Filters</span>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Workout Type</Form.Label>
                  <Form.Select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="all">All Types</option>
                    {Object.entries(WORKOUT_TYPES).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Date Range</Form.Label>
                  <Form.Select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  >
                    <option value="all">All Time</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Sort By</Form.Label>
                  <Form.Select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  >
                    <option value="date">Date</option>
                    <option value="duration">Duration</option>
                    <option value="intensity">Intensity</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {filteredWorkouts.length === 0 ? (
          <Alert variant="info">
            No workouts found. {filters.type !== 'all' || filters.dateRange !== 'all' ? (
              <Button variant="link" className="p-0" onClick={() => setFilters({ type: 'all', dateRange: 'all', sortBy: 'date' })}>
                Clear filters
              </Button>
            ) : (
              <Link to="/workouts/new">Log your first workout!</Link>
            )}
          </Alert>
        ) : (
          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Intensity</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map(workout => (
                  <tr key={workout.id}>
                    <td>{new Date(workout.date_logged).toLocaleDateString()}</td>
                    <td>{workout.workout_type_display}</td>
                    <td>{workout.duration} min</td>
                    <td>{workout.calories}</td>
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
                      <div className="text-truncate" style={{ maxWidth: '200px' }}>
                        {workout.notes || '-'}
                      </div>
                    </td>
                    <td>
                      <Button
                        as={Link}
                        to={`/workouts/${workout.id}`}
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(workout.id)}
                        title="Delete"
                      >
                        <FiTrash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Container>
    </ErrorBoundary>
  );
};

export default WorkoutHistory;