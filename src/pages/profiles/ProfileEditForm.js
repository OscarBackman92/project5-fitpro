import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Save } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfileEditForm = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfile(formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          type="date"
          value={formData.date_of_birth}
          onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          min="0"
          step="0.1"
          placeholder="Enter your weight"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Height (cm)</Form.Label>
        <Form.Control
          type="number"
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          min="0"
          step="0.1"
          placeholder="Enter your height"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Fitness Goals</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.fitness_goals}
          onChange={(e) => setFormData({ ...formData, fitness_goals: e.target.value })}
          placeholder="What are your fitness goals?"
        />
      </Form.Group>

      <div className="d-grid">
        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          className="d-flex align-items-center justify-content-center gap-2"
        >
          <Save size={20} />
          {loading ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </div>
    </Form>
  );
};

export default ProfileEditForm;