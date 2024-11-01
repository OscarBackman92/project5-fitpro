import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ProfileProvider } from '../../contexts/ProfileContext';
import ProfilePictureUpload from '../../profile/ProfilePictureUpload';
import ProfileForm from '../../profile/ProfileForm';

const Profile = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Profile Settings</h1>
      
      <ProfileProvider>
        <Row>
          <Col md={4}>
            <Card className="mb-4">
              <Card.Body>
                <ProfilePictureUpload />
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={8}>
            <Card>
              <Card.Body>
                <ProfileForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </ProfileProvider>
    </Container>
  );
};

export default Profile;