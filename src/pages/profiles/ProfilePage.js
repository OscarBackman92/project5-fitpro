import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileSettings from './ProfileSettings';

const ProfilePage = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h2 className="mb-4">Profile Settings</h2>
          <ProfileSettings />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;