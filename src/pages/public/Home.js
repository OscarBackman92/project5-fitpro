import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiActivity, FiTrendingUp, FiUsers, FiTarget } from 'react-icons/fi';

const PublicHome = () => {
  return (
    <Container>
      {/* Hero Section */}
      <Row className="py-5 text-center">
        <Col lg={8} className="mx-auto">
          <h1 className="display-4 mb-4">Track Your Fitness Journey</h1>
          <p className="lead mb-4">
            Take control of your health and fitness with our comprehensive workout tracking platform. 
            Log workouts, track progress, and achieve your fitness goals.
          </p>
          <Button 
            as={Link} 
            to="/register" 
            variant="primary" 
            size="lg" 
            className="me-3"
          >
            Get Started
          </Button>
          <Button 
            as={Link} 
            to="/login" 
            variant="outline-primary" 
            size="lg"
          >
            Login
          </Button>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="py-5">
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FiActivity className="text-primary mb-3" size={40} />
              <Card.Title>Track Workouts</Card.Title>
              <Card.Text>
                Log and monitor your daily workouts with detailed tracking of exercises, duration, and intensity.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FiTrendingUp className="text-success mb-3" size={40} />
              <Card.Title>View Progress</Card.Title>
              <Card.Text>
                Visualize your fitness journey with detailed progress tracking and analytics.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FiUsers className="text-info mb-3" size={40} />
              <Card.Title>Community</Card.Title>
              <Card.Text>
                Connect with other fitness enthusiasts and share your achievements.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="h-100 text-center">
            <Card.Body>
              <FiTarget className="text-danger mb-3" size={40} />
              <Card.Title>Set Goals</Card.Title>
              <Card.Text>
                Set and track personal fitness goals to stay motivated and focused.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row className="py-5 text-center bg-light rounded">
        <Col md={8} className="mx-auto">
          <h2 className="mb-3">Ready to Start Your Fitness Journey?</h2>
          <p className="mb-4">
            Join thousands of users who are already tracking their fitness progress 
            and achieving their goals.
          </p>
          <Button 
            as={Link} 
            to="/register" 
            variant="primary" 
            size="lg"
          >
            Sign Up Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicHome;