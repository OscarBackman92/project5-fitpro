// src/components/pages/private/Profile.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import { FiSave, FiCamera } from 'react-icons/fi';

const Profile = () => {
  const { user, updateProfile, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    weight: user?.weight || '',
    height: user?.height || '',
    fitness_goals: user?.fitness_goals || '',
    date_of_birth: user?.date_of_birth || '',
    gender: user?.gender || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('profile_picture', file);
    
    setLoading(true);
    try {
      await updateProfile(formData);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      console.error('Profile picture update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Profile Settings</h2>

      {authError && <Alert variant="danger">{authError}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block mb-3">
                <img
                  src={user?.profile_picture || '/api/placeholder/150/150'}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 end-0">
                  <label className="btn btn-primary btn-sm rounded-circle p-2">
                    <FiCamera />
                    <input
                      type="file"
                      className="d-none"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                  </label>
                </div>
              </div>
              <h5 className="mb-1">{user?.name}</h5>
              <p className="text-muted mb-0">{user?.email}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        step="0.1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Height (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({...formData, height: e.target.value})}
                        step="0.1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Fitness Goals</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={formData.fitness_goals}
                        onChange={(e) => setFormData({...formData, fitness_goals: e.target.value})}
                        placeholder="What are your fitness goals?"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="d-flex align-items-center justify-content-center gap-2"
                  >
                    <FiSave />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;