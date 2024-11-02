import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../../components/common/Avatar';

const ProfilePictureUpload = () => {
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
      await updateProfilePicture(file);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      setError('Failed to update profile picture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <div className="position-relative d-inline-block">
        <Avatar
          src={user?.profile_picture}
          alt={user?.name || 'Profile'}
          size={150}
          loading={loading}
        />
        
        <label 
          className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <Camera className="text-white" size={20} />
          <input
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;