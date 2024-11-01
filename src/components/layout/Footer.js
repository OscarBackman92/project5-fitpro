// src/components/layout/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiGithub, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <Container>
        <Row className="gy-4">
          {/* Brand Section */}
          <Col md={6} lg={3}>
            <h5 className="text-light mb-3">FitTracker Pro</h5>
            <p className="text-muted small">
              Track your fitness journey, achieve your goals, and stay motivated
              with our comprehensive workout tracking platform.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={6} lg={3}>
            <h6 className="text-light mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/dashboard" className="text-muted text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/workouts" className="text-muted text-decoration-none">
                  Workouts
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-muted text-decoration-none">
                  Profile
                </Link>
              </li>
            </ul>
          </Col>

          {/* Resources */}
          <Col md={6} lg={3}>
            <h6 className="text-light mb-3">Resources</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/help" className="text-muted text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-muted text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-muted text-decoration-none">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col md={6} lg={3}>
            <h6 className="text-light mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a
                href="https://instagram.com"
                className="text-muted"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-muted"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://github.com"
                className="text-muted"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <FiGithub size={20} />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <small className="text-muted">
              © {currentYear} FitTracker Pro. Made with{' '}
              <FiHeart className="text-danger" /> for a healthier tomorrow.
            </small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link 
              to="/privacy" 
              className="text-muted text-decoration-none small me-3"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-muted text-decoration-none small me-3"
            >
              Terms
            </Link>
            <Link 
              to="/contact" 
              className="text-muted text-decoration-none small"
            >
              Contact
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;