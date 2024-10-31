import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FiInstagram, 
  FiTwitter, 
  FiGithub, 
  FiHeart 
} from 'react-icons/fi';

import './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light mt-auto py-4 border-top">
      <Container>
        <Row className="gy-4">
          {/* Brand Section */}
          <Col md={6} lg={3}>
            <h5 className="fw-bold mb-3 text-primary">Fitness Tracker</h5>
            <p className="text-muted small mb-0">
              Track your workouts, achieve your goals, and stay motivated.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={6} lg={3}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link 
                  to="/dashboard" 
                  className="text-decoration-none text-muted"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/workouts" 
                  className="text-decoration-none text-muted"
                >
                  Workouts
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/profile" 
                  className="text-decoration-none text-muted"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </Col>

          {/* Support Links */}
          <Col md={6} lg={3}>
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link 
                  to="/help" 
                  className="text-decoration-none text-muted"
                >
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/privacy" 
                  className="text-decoration-none text-muted"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/terms" 
                  className="text-decoration-none text-muted"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Col>

          {/* Social Links */}
          <Col md={6} lg={3}>
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
            <a 
                href="https://www.instagram.com" 
                className="text-muted" 
                aria-label="Instagram" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                <FiInstagram size={20} />
                </a>
                <a 
                href="https://twitter.com" 
                className="text-muted" 
                aria-label="Twitter" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                <FiTwitter size={20} />
                </a>
                <a 
                href="https://github.com" 
                className="text-muted" 
                aria-label="Github" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                <FiGithub size={20} />
                </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="mt-4 pt-3 border-top">
          <Col md={6} className="text-center text-md-start">
            <small className="text-muted d-flex align-items-center justify-content-center justify-content-md-start gap-1">
              © {currentYear} Fitness Tracker. Made with 
              <FiHeart className="text-danger" /> 
              for a healthier tomorrow.
            </small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link 
              to="/about" 
              className="text-decoration-none text-muted me-3"
            >
              <small>About</small>
            </Link>
            <Link 
              to="/contact" 
              className="text-decoration-none text-muted"
            >
              <small>Contact</small>
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;