import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './components/contexts/AuthContext';
import { WorkoutProvider } from './components/contexts/WorkoutContext';
import { ProfileProvider } from './components/contexts/ProfileContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/layout/LoadingSpinner';
import PublicNavbar from './components/layout/PublicNavbar';
import AuthNavbar from './components/layout/AuthNavbar';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuth } from './components/hooks/useAuth';

// Public Pages
import PublicHome from './components/pages/public/PublicHome';
import Login from './components/pages/public/Login';
import Register from './components/pages/public/Register';

// Private Pages - Lazy loaded
const Dashboard = React.lazy(() => import('./components/pages/private/Dashboard'));
const Profile = React.lazy(() => import('./components/pages/private/Profile'));
const WorkoutHistory = React.lazy(() => import('./components/pages/private/WorkoutHistory'));
const LogWorkout = React.lazy(() => import('./components/pages/private/LogWorkout'));
const WorkoutDetails = React.lazy(() => import('./components/pages/private/WorkoutDetails'));

const AppContent = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {token ? <AuthNavbar /> : <PublicNavbar />}
      <main className="flex-grow-1">
        <Container className="py-4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route 
                  path="/" 
                  element={!token ? <PublicHome /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                  path="/login" 
                  element={!token ? <Login /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                  path="/register" 
                  element={!token ? <Register /> : <Navigate to="/dashboard" />} 
                />

                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <WorkoutProvider>
                        <Dashboard />
                      </WorkoutProvider>
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <ProfileProvider>
                        <Profile />
                      </ProfileProvider>
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/workouts" 
                  element={
                    <PrivateRoute>
                      <WorkoutProvider>
                        <WorkoutHistory />
                      </WorkoutProvider>
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/workouts/new" 
                  element={
                    <PrivateRoute>
                      <WorkoutProvider>
                        <LogWorkout />
                      </WorkoutProvider>
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/workouts/:id" 
                  element={
                    <PrivateRoute>
                      <WorkoutProvider>
                        <WorkoutDetails />
                      </WorkoutProvider>
                    </PrivateRoute>
                  } 
                />

                {/* 404 Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Container>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;