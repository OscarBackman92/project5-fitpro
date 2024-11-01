// src/components/pages/private/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiPlus, FiActivity, FiClock, FiTarget } from 'react-icons/fi';
import { useWorkouts } from '../../../contexts/WorkoutContext';
import LoadingSpinner from '../../layout/LoadingSpinner';
import { format } from 'date-fns';

const Dashboard = () => {
  const { fetchSummary, loading } = useWorkouts();
  const [summary, setSummary] = useState({
    total_workouts: 0,
    total_duration: 0,
    total_calories: 0,
    workouts_this_week: 0,
    workouts_this_month: 0,
    recent_workouts: []
  });

  useEffect(() => {
    const loadSummary = async () => {
      const data = await fetchSummary();
      if (data) {
        setSummary(data);
      }
    };
    loadSummary();
  }, [fetchSummary]);

  if (loading) return <LoadingSpinner />;

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className={`rounded-circle bg-${color} bg-opacity-10 p-3 me-3`}>
            <Icon className={`text-${color}`} size={24} />
          </div>
          <div>
            <h6 className="mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
        </div>
      </Card.Body>
    </Card>
  );

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
        <Col md={6} lg={3}>
          <StatCard
            icon={FiActivity}
            title="Total Workouts"
            value={summary.total_workouts}
            color="primary"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={FiClock}
            title="Total Minutes"
            value={summary.total_duration}
            color="success"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={FiTarget}
            title="This Week"
            value={summary.workouts_this_week}
            color="info"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            icon={FiActivity}
            title="Monthly"
            value={summary.workouts_this_month}
            color="warning"
          />
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Recent Workouts</h5>
            </Card.Header>
            <Card.Body>
              {summary.recent_workouts.length > 0 ? (
                <div className="list-group">
                  {summary.recent_workouts.map((workout) => (
                    <Link
                      key={workout.id}
                      to={`/workouts/${workout.id}`}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{workout.workout_type_display}</h6>
                          <small>{format(new Date(workout.date_logged), 'MMM dd, yyyy')}</small>
                        </div>
                        <div className="text-end">
                          <div>{workout.duration} mins</div>
                          <small className="text-muted">{workout.calories} calories</small>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-0">No recent workouts</p>
                  <Button as={Link} to="/workouts/new" variant="primary" className="mt-3">
                    Log Your First Workout
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Stats</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Avg. Duration:</span>
                <strong>
                  {summary.total_workouts
                    ? Math.round(summary.total_duration / summary.total_workouts)
                    : 0} mins
                </strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Avg. Calories:</span>
                <strong>
                  {summary.total_workouts
                    ? Math.round(summary.total_calories / summary.total_workouts)
                    : 0}
                </strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Completion Rate:</span>
                <strong>
                  {Math.round((summary.workouts_this_week / 7) * 100)}%
                </strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;