import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import PublicNavbar from './components/layout/PublicNavbar';
import AuthNavbar from './components/layout/AuthNavbar';
import PrivateRoute from './components/auth/PrivateRoute';
import LoadingSpinner from './components/layout/LoadingSpinner';
import Footer from './components/layout/Footer';
import { useAuth } from './components/contexts/AuthContext';

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



function App() {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <div className="d-flex flex-column min-vh-100">
        <Router>
          {token ? <AuthNavbar /> : <PublicNavbar />}
          <main className="flex-grow-1">
            <ErrorBoundary>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={!token ? <PublicHome /> : <Navigate to="/dashboard" />} />
                  <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
                  <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path="/workouts" element={<PrivateRoute><WorkoutHistory /></PrivateRoute>} />
                  <Route path="/workouts/new" element={<PrivateRoute><LogWorkout /></PrivateRoute>} />
                  <Route path="/workouts/:id" element={<PrivateRoute><WorkoutDetails /></PrivateRoute>} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;