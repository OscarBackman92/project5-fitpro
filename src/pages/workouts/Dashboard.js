import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiActivity, FiClock } from 'react-icons/fi';
import { useWorkouts } from '../../hooks/useWorkouts';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Dashboard = () => {
  const { loading, error, fetchSummary } = useWorkouts();
  const [stats, setStats] = useState({
    total_workouts: 0,
    total_duration: 0,
    workouts_this_week: 0,
    workouts_this_month: 0,
    recent_workouts: []
  });

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const data = await fetchSummary();
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error('Error loading summary:', err);
      }
    };

    loadSummary();
  }, [fetchSummary]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Log Workout
        </Button>
      </div>

      <Row>
        <Col md={6} lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FiActivity className="text-primary" size={24} />
                </div>
                <div>
                  <h6 className="mb-1">Total Workouts</h6>
                  <h3 className="mb-0">{stats.total_workouts}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FiClock className="text-success" size={24} />
                </div>
                <div>
                  <h6 className="mb-1">Total Minutes</h6>
                  <h3 className="mb-0">{stats.total_duration}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {stats.recent_workouts.length > 0 && (
        <Card>
          <Card.Header>
            <h5 className="mb-0">Recent Workouts</h5>
          </Card.Header>
          <Card.Body>
            <div className="list-group">
              {stats.recent_workouts.map((workout) => (
                <Link
                  key={workout.id}
                  to={`/workouts/${workout.id}`}
                  className="list-group-item list-group-item-action"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">{workout.workout_type_display}</h6>
                      <small>{new Date(workout.date_logged).toLocaleDateString()}</small>
                    </div>
                    <div>{workout.duration} mins</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;