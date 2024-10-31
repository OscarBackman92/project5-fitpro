import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const WorkoutDetails = () => {
  const { id } = useParams();
  
  return (
    <Container>
      <h1>Workout Details - {id}</h1>
    </Container>
  );
};

export default WorkoutDetails;