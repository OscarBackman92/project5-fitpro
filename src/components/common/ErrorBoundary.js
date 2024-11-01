// src/components/common/ErrorBoundary.js
import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Here you could log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <Alert variant="danger">
            <div className="text-center mb-4">
              <FiAlertTriangle size={50} className="text-danger mb-3" />
              <h4>Oops! Something went wrong</h4>
              <p className="text-muted">
                We're sorry for the inconvenience. Please try refreshing the page.
              </p>
            </div>
            
            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="outline-danger"
                onClick={() => window.location.reload()}
              >
                <FiRefreshCw className="me-2" />
                Refresh Page
              </Button>
              <Button
                variant="danger"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-4">
                <details className="text-muted">
                  <summary>Error Details</summary>
                  <pre className="mt-2">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;