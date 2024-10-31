import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Image } from 'react-bootstrap';
import { FiSave, FiCamera } from 'react-icons/fi';
import { api } from '../../../services/api';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../layout/LoadingSpinner';

const Profile = () => {
  const { user, fetchUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    height: '',
    fitness_goals: '',
    date_of_birth: '',
    gender: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        weight: user.weight || '',
        height: user.height || '',
        fitness_goals: user.fitness_goals || '',
        date_of_birth: user.date_of_birth || '',
        gender: user.gender || ''
      });
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (profileImage) {
        formDataToSend.append('profile_picture', profileImage);
      }

      await api.profile.update(formDataToSend);
      await fetchUserProfile();
      setSuccess('Profile updated successfully!');
      setProfileImage(null);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      <h2 className="mb-4">Profile Settings</h2>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block mb-3">
                <Image 
                  src={user?.profile_picture || 'https://via.placeholder.com/150'}
                  roundedCircle
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <label 
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2 cursor-pointer"
                  style={{ cursor: 'pointer' }}
                >
                  <FiCamera color="white" />
                  <input
                    type="file"
                    className="d-none"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </label>
              </div>
              <h5>{formData.name || 'Your Name'}</h5>
              <p className="text-muted">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        min="0"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Height (cm)</Form.Label>
                      <Form.Control
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        min="0"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Fitness Goals</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="fitness_goals"
                        value={formData.fitness_goals}
                        onChange={handleChange}
                        placeholder="What are your fitness goals?"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={saving}
                  >
                    <FiSave className="me-2" />
                    {saving ? 'Saving Changes...' : 'Save Changes'}
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