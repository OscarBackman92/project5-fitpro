import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import LoadingSpinner from './components/common/LoadingSpinner';
import Footer from './components/layout/Footer';
import { useAuth } from './hooks/useAuth';
import { ROUTES } from './utils/constants';

// Lazy load components
const PublicHome = React.lazy(() => import('./pages/public/Home'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const Dashboard = React.lazy(() => import('./pages/workouts/Dashboard'));
const Profile = React.lazy(() => import('./pages/profiles/ProfilePage'));
const WorkoutHistory = React.lazy(() => import('./pages/workouts/WorkoutHistory'));
const LogWorkout = React.lazy(() => import('./pages/workouts/WorkoutForm'));
const WorkoutDetails = React.lazy(() => import('./pages/workouts/WorkoutDetails'));

function AppRoutes() {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path={ROUTES.HOME} 
        element={!token ? <PublicHome /> : <Navigate to={ROUTES.DASHBOARD} />} 
      />
      <Route 
        path={ROUTES.LOGIN} 
        element={!token ? <Login /> : <Navigate to={ROUTES.DASHBOARD} />} 
      />
      <Route 
        path={ROUTES.REGISTER} 
        element={!token ? <Register /> : <Navigate to={ROUTES.DASHBOARD} />} 
      />

      {/* Protected Routes */}
      <Route 
        path={ROUTES.DASHBOARD} 
        element={<PrivateRoute><Dashboard /></PrivateRoute>} 
      />
      <Route 
        path={ROUTES.PROFILE} 
        element={<PrivateRoute><Profile /></PrivateRoute>} 
      />
      <Route 
        path={ROUTES.WORKOUTS} 
        element={<PrivateRoute><WorkoutHistory /></PrivateRoute>} 
      />
      <Route 
        path={ROUTES.WORKOUT_NEW} 
        element={<PrivateRoute><LogWorkout /></PrivateRoute>} 
      />
      <Route 
        path={ROUTES.WORKOUT_DETAILS} 
        element={<PrivateRoute><WorkoutDetails /></PrivateRoute>} 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

function AppContent() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1 mt-5 pt-3">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <Router>
              <AppContent />
            </Router>
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;