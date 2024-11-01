import React, { useState } from 'react';
import { Image, Alert } from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePicture = () => {
  const { user, updateProfilePicture } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

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

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateProfilePicture(file);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      setError('Failed to update profile picture');
      setPreviewUrl(null);
    } finally {
      setLoading(false);
      // Cleanup preview URL
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="text-center">
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

      <div className="position-relative d-inline-block">
        <Image
          src={previewUrl || user?.profile_picture || '/api/placeholder/150/150'}
          alt="Profile"
          roundedCircle
          className={loading ? 'opacity-50' : ''}
          style={{ 
            width: '150px', 
            height: '150px', 
            objectFit: 'cover' 
          }}
        />
        
        <label 
          className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-2"
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          <Camera 
            className="text-white" 
            size={20}
          />
          <input
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </label>

        {loading && (
          <div 
            className="position-absolute top-50 start-50 translate-middle"
          >
            <div 
              className="spinner-border text-primary" 
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;