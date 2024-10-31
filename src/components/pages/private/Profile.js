import React from 'react';
import { Container, Card } from 'react-bootstrap';
import ProfilePicture from '../../profile/ProfilePicture';
import ProfileForm from '../../profile/ProfileForm';

const Profile = () => {
  return (
    <Container>
      <h2 className="mb-4">Profile Settings</h2>
      
      <Card>
        <Card.Body>
          <ProfilePicture />
          <ProfileForm />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;