import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { WorkoutProvider } from './contexts/WorkoutContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

if (process.env.NODE_ENV === 'development') {
  console.log('Environment Configuration:');
  console.log('-------------------------');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log('App Version:', process.env.REACT_APP_VERSION);
  console.log('-------------------------');
}
// Error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could also send this to an error reporting service
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <WorkoutProvider>
          <App />
        </WorkoutProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

// Performance measurement
reportWebVitals(metric => {
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  // You could send metrics to an analytics service here
});