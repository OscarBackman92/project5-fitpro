import React from 'react';
import { Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to your error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p className="mb-3">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="d-flex justify-content-center gap-2">
              <Button 
                variant="outline-danger" 
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              <Button 
                variant="danger" 
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-3 text-start bg-light p-3 rounded">
                {this.state.errorInfo?.componentStack}
              </pre>
            )}
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;