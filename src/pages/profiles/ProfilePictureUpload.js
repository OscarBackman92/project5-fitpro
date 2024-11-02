import React, { useState } from 'react';
import { Alert, ProgressBar } from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePictureUpload = () => {
  const { user, updateProfilePicture } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      const onProgress = (progress) => {
        setUploadProgress(progress);
      };

      await updateProfilePicture(file, onProgress);
      setSuccess('Profile picture updated successfully!');
    } catch (err) {
      console.error('Profile picture update error:', err);
      setError(err.message || 'Failed to update profile picture');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="text-center">
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      <div className="position-relative d-inline-block">
        <img
          src={user?.profile_picture || '/api/placeholder/150/150'}
          alt="Profile"
          className={`rounded-circle ${loading ? 'opacity-50' : ''}`}
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
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

        {loading && (
          <div className="position-absolute top-50 start-50 translate-middle w-75">
            <ProgressBar 
              now={uploadProgress} 
              label={`${uploadProgress}%`}
              variant="info"
              animated
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureUpload;