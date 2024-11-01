import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfileForm = () => {
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
      const result = await updateProfile(formData);
      if (result.success) {
        setSuccess('Profile updated successfully!');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert 
          variant="danger" 
          onClose={() => setError('')} 
          dismissible
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          onClose={() => setSuccess('')} 
          dismissible
        >
          {success}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
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

      <Form.Group className="mb-3">
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          step="0.1"
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
          step="0.1"
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

      <Button 
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-100"
      >
        <Save size={20} className="me-2" />
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </Form>
  );
};

export default ProfileForm;