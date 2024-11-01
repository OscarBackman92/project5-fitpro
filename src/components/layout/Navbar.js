import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiUser,
  FiActivity,
  FiLogOut,
  FiPlusCircle,
  FiHeart,
  FiUsers
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useClickOutsideToggle } from '../hooks/useClickOutsideToggle';
import styles from '../../styles/NavBar.module.css';

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  const addWorkoutIcon = (
    <NavLink
      className={styles.NavLink}
      to="/workouts/new"
      onClick={() => setExpanded(false)}
    >
      <FiPlusCircle />
      Log Workout
    </NavLink>
  );

  const loggedInIcons = (
    <>
      <NavLink 
        className={styles.NavLink} 
        to="/workouts"
        onClick={() => setExpanded(false)}
      >
        <FiActivity />
        Workouts
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/dashboard"
        onClick={() => setExpanded(false)}
      >
        <FiHome />
        Dashboard
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/social"
        onClick={() => setExpanded(false)}
      >
        <FiUsers />
        Social
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/favorites"
        onClick={() => setExpanded(false)}
      >
        <FiHeart />
        Favorites
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/" 
        onClick={() => {
          handleSignOut();
          setExpanded(false);
        }}
      >
        <FiLogOut />
        Sign out
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/profile"
        onClick={() => setExpanded(false)}
      >
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            alt={user.name}
            className={styles.Avatar}
          />
        ) : (
          <FiUser />
        )}
        {user?.name || 'Profile'}
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink 
        className={styles.NavLink} 
        to="/login"
        onClick={() => setExpanded(false)}
      >
        <FiLogIn />
        Sign in
      </NavLink>
      
      <NavLink 
        className={styles.NavLink} 
        to="/register"
        onClick={() => setExpanded(false)}
      >
        <FiUserPlus />
        Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      variant="dark"
      bg="dark"
      expand="lg"
      fixed="top"
    >
      <Container>
        <NavLink to={isAuthenticated ? "/dashboard" : "/"} onClick={() => setExpanded(false)}>
          <Navbar.Brand className={styles.Brand}>
            Fitness Tracker
          </Navbar.Brand>
        </NavLink>

        {isAuthenticated && addWorkoutIcon}

        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              className={styles.NavLink}
              to="/"
              onClick={() => setExpanded(false)}
            >
              <FiHome />
              Home
            </NavLink>

            {isAuthenticated ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;