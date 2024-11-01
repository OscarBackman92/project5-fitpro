import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import { ProfileProvider } from './components/contexts/ProfileContext';
import { WorkoutProvider } from './components/contexts/WorkoutContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import LoadingSpinner from './components/layout/LoadingSpinner';
import Footer from './components/layout/Footer';
import { useAuth } from './components/hooks/useAuth';

// Lazy load components
const PublicHome = React.lazy(() => import('./components/pages/public/PublicHome'));
const Login = React.lazy(() => import('./components/pages/public/Login'));
const Register = React.lazy(() => import('./components/pages/public/Register'));
const Dashboard = React.lazy(() => import('./components/pages/private/Dashboard'));
const Profile = React.lazy(() => import('./components/profiles/Profile'));
const WorkoutHistory = React.lazy(() => import('./components/pages/private/WorkoutHistory'));
const LogWorkout = React.lazy(() => import('./components/pages/private/LogWorkout'));
const WorkoutDetails = React.lazy(() => import('./components/pages/private/WorkoutDetails'));

function AppRoutes() {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
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
        element={<PrivateRoute><Dashboard /></PrivateRoute>} 
      />
      <Route 
        path="/profile" 
        element={<PrivateRoute><Profile /></PrivateRoute>} 
      />
      <Route 
        path="/workouts" 
        element={<PrivateRoute><WorkoutHistory /></PrivateRoute>} 
      />
      <Route 
        path="/workouts/new" 
        element={<PrivateRoute><LogWorkout /></PrivateRoute>} 
      />
      <Route 
        path="/workouts/:id" 
        element={<PrivateRoute><WorkoutDetails /></PrivateRoute>} 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
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