import React from 'react';
import { Alert, Button } from 'react-bootstrap';

export default function ErrorBoundary({ children }) {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const handleError = (error) => {
      setHasError(true);
      setError(error);
      // Log to error reporting service here
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="p-4">
        <Alert variant="danger">
          <Alert.Heading>Something went wrong</Alert.Heading>
          <p className="mb-0">
            {error?.message || 'An unexpected error occurred. Please try again later.'}
          </p>
          <Button 
            className="mt-3" 
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </Alert>
      </div>
    );
  }

  return children;
}