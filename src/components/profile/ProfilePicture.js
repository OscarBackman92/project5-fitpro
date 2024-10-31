import React, { useState } from 'react';
import { Image, Alert } from 'react-bootstrap';
import { FiCamera } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const ProfilePicture = () => {
  const { user, updateProfilePicture } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await updateProfilePicture(file);
      if (result.success) {
        setSuccess('Profile picture updated successfully!');
      } else {
        setError('Failed to update profile picture');
      }
    } catch (err) {
      setError('An error occurred while updating profile picture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-picture-container text-center">
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <div className="position-relative d-inline-block">
        <Image
          src={user?.profile_picture || '/placeholder-avatar.png'}
          alt="Profile"
          roundedCircle
          className="profile-image"
        />
        <label className="camera-button">
          <FiCamera color="white" size={20} />
          <input
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      </div>

      {loading && (
        <div className="text-center mt-2">
          <small className="text-muted">Uploading...</small>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;