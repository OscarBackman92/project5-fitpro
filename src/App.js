import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicNavbar from './components/layout/PublicNavbar';
import AuthNavbar from './components/layout/AuthNavbar';
import PrivateRoute from './components/auth/PrivateRoute';

// Public Pages
import Login from './components/pages/public/Login';
import Register from './components/pages/public/Register';
import PublicHome from './components/pages/public/PublicHome';

// Private Pages
import Dashboard from './components/pages/private/Dashboard';
import Profile from './components/pages/private/Profile';
import WorkoutHistory from './components/pages/private/WorkoutHistory';
import LogWorkout from './components/pages/private/LogWorkout';
import WorkoutDetails from './components/pages/private/WorkoutDetails';

// Auth Context
import { useAuth } from './components/contexts/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Router>
      {/* Conditional Navbar */}
      {token ? <AuthNavbar /> : <PublicNavbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/workouts" 
          element={
            <PrivateRoute>
              <WorkoutHistory />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/workouts/new" 
          element={
            <PrivateRoute>
              <LogWorkout />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/workouts/:id" 
          element={
            <PrivateRoute>
              <WorkoutDetails />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;