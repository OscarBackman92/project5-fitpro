import React, { useEffect } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useWorkouts } from '../../hooks/useWorkouts';
import LoadingSpinner from '../../layout/LoadingSpinner';

const WorkoutHistory = () => {
  const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useWorkouts();

  useEffect(() => {
    console.log('Fetching workouts...');
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
      fetchWorkouts(); // Refresh the list after deletion
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  // Ensure workouts is an array
  const workoutList = Array.isArray(workouts) ? workouts : [];

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Workouts</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Log Workout
        </Button>
      </div>

      {workoutList.length === 0 ? (
        <Card className="text-center p-4">
          <Card.Body>
            <p>No workouts found. Start by adding your first workout!</p>
            <Button as={Link} to="/workouts/new" variant="primary">
              Log Your First Workout
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Table responsive hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workoutList.map((workout) => (
              <tr key={workout.id}>
                <td>{new Date(workout.date_logged).toLocaleDateString()}</td>
                <td>{workout.workout_type_display}</td>
                <td>{workout.duration} mins</td>
                <td>{workout.calories}</td>
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
      )}
    </Container>
  );
};

export default WorkoutHistory;