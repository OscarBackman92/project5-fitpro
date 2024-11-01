import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiActivity, FiLogOut, FiPlusCircle } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const AuthNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">FITPRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/dashboard">
              <FiHome className="me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/workouts">
              <FiActivity className="me-2" />
              Workouts
            </Nav.Link>
            <Nav.Link as={Link} to="/workouts/new">
              <FiPlusCircle className="me-2" />
              Log Workout
            </Nav.Link>
            <NavDropdown 
              title={
                <span>
                  <FiUser className="me-2" />
                  {user?.name || 'Profile'}
                </span>
              } 
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                <FiLogOut className="me-2" />
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AuthNavbar;