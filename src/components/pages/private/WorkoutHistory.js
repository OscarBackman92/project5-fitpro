import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { api } from '../../../services/api';
import LoadingSpinner from '../../layout/LoadingSpinner';

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWorkouts = async () => {
    try {
      const response = await api.workouts.getAll();
      console.log('API Response:', response); // Debug log
      
      // Ensure we're accessing the data correctly
      const workoutData = response.data;
      console.log('Workout Data:', workoutData); // Debug log
      
      setWorkouts(Array.isArray(workoutData) ? workoutData : []);
    } catch (err) {
      console.error('Error fetching workouts:', err); // Debug log
      setError('Failed to load workouts');
      setWorkouts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await api.workouts.delete(id);
        setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id));
      } catch (err) {
        setError('Failed to delete workout');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Workouts</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Add Workout
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {workouts.length === 0 ? (
        <Alert variant="info">
          You haven't logged any workouts yet.{' '}
          <Link to="/workouts/new">Log your first workout!</Link>
        </Alert>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Intensity</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
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
                <td>{workout.notes?.slice(0, 30)}{workout.notes?.length > 30 ? '...' : ''}</td>
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
      )}
    </Container>
  );
};

export default WorkoutHistory;