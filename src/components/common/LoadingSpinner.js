import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner = ({ fullPage = true }) => {
  const spinner = (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (!fullPage) {
    return spinner;
  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      {spinner}
    </Container>
  );
};

export default LoadingSpinner;