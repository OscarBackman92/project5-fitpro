import React, { useState } from 'react';
import { Card, Nav } from 'react-bootstrap';
import ProfilePictureUpload from './ProfilePictureUpload';
import ProfileEditForm from './ProfileEditForm';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <Nav variant="tabs" className="border-bottom-0">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'details'}
              onClick={() => setActiveTab('details')}
            >
              Profile Details
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'picture'}
              onClick={() => setActiveTab('picture')}
            >
              Profile Picture
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {activeTab === 'details' ? (
          <ProfileEditForm />
        ) : (
          <ProfilePictureUpload />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProfileSettings;