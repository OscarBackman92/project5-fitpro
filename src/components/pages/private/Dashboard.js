import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiActivity, FiClock, FiTrendingUp } from 'react-icons/fi';
import { api } from '../../../services/api';
import LoadingSpinner from '../../layout/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_workouts: 0,
    total_duration: 0,
    total_calories: 0,
    workouts_this_week: 0,
    workouts_this_month: 0,
    recent_workouts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.workouts.getSummary();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <Button as={Link} to="/workouts/new" variant="primary">
          <FiPlus className="me-2" />
          Log New Workout
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <Row>
        {/* Stats Cards */}
        <Col md={4}>
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

        <Col md={4}>
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

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-warning bg-opacity-10 p-3 me-3">
                  <FiTrendingUp className="text-warning" size={24} />
                </div>
                <div>
                  <h6 className="mb-1">Total Calories</h6>
                  <h3 className="mb-0">{stats.total_calories}</h3>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Recent Workouts */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Recent Workouts</h5>
            </Card.Header>
            <Card.Body>
              {stats.recent_workouts.length > 0 ? (
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
                        <div className="text-end">
                          <div>{workout.duration} mins</div>
                          <small>{workout.calories} calories</small>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center mb-0">No recent workouts</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Weekly Summary */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Progress Overview</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <small className="text-muted">This Week's Workouts</small>
                <h4>{stats.workouts_this_week}</h4>
              </div>
              <div>
                <small className="text-muted">This Month's Workouts</small>
                <h4>{stats.workouts_this_month}</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;