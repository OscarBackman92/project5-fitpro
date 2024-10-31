import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './components/contexts/AuthContext';
import { WorkoutProvider } from './components/contexts/WorkoutContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/layout/LoadingSpinner';
import App from './App';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Configure axios defaults if needed
import axiosInstance from './utils/axios.config';
if (process.env.REACT_APP_API_URL) {
  axiosInstance.defaults.baseURL = process.env.REACT_APP_API_URL;
}

// Add error handler for uncaught promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root');
// Ensure we only create root once
const root = rootElement._reactRootContainer?._internalRoot ? 
  ReactDOM.hydrateRoot(rootElement) : 
  ReactDOM.createRoot(rootElement);

const AppWithProviders = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <WorkoutProvider>
          <React.Suspense fallback={<LoadingSpinner />}>
            <App />
          </React.Suspense>
        </WorkoutProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

root.render(<AppWithProviders />);

// Log environment information
if (process.env.NODE_ENV === 'development') {
  console.log('Running in development mode');
  console.log('API URL:', process.env.REACT_APP_API_URL);
}