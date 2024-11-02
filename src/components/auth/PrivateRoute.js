import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';  // Change to direct useAuth import
import LoadingSpinner from '../common/LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();
  
  // Debug log to see what we're getting
  console.log('Auth state:', {
    auth,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading
  });

  if (auth.loading) {
    return <LoadingSpinner />;
  }

  // Use token directly as it's more reliable
  if (!auth.token) {
    console.log('Redirecting to login, no token found');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Rendering protected content');
  return children;
};

export default PrivateRoute;