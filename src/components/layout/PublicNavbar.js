import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiHome, FiLogIn, FiUserPlus } from 'react-icons/fi';

const PublicNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">FITPRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FiHome className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              <FiLogIn className="me-2" />
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              <FiUserPlus className="me-2" />
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;