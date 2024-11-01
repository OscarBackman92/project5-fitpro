import React, { useRef, useState, useCallback } from 'react';
import { Image, Button, ProgressBar, Alert } from 'react-bootstrap';
import { Camera } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { useAuth } from '../hooks/useAuth';

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ProfilePictureUpload = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const { handleProfilePictureUpload, loading, error, uploadProgress, setError } = useProfile();
  const { user, refreshProfile } = useAuth();

  const validateFile = useCallback((file) => {
    if (!file) return 'Please select an image file';
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Image size should be less than 5MB';
    }
    return null;
  }, []);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous states
    setError(null);
    
    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const result = await handleProfilePictureUpload(file);
      if (result.success) {
        await refreshProfile();
        setPreview(null);
      }
    } catch (err) {
      console.error('Profile picture upload failed:', err);
    }

    // Cleanup
    URL.revokeObjectURL(objectUrl);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleProfilePictureUpload, validateFile, refreshProfile, setError]);

  return (
    <div className="text-center">
      {error && (
        <Alert 
          variant="danger" 
          onClose={() => setError(null)} 
          dismissible
        >
          {error}
        </Alert>
      )}

      <div className="position-relative d-inline-block mb-3">
        <Image
          src={preview || user?.profile_picture || '/api/placeholder/150/150'}
          alt="Profile"
          roundedCircle
          className={`border ${loading ? 'opacity-50' : ''}`}
          style={{ 
            width: '150px', 
            height: '150px', 
            objectFit: 'cover',
            backgroundColor: '#f8f9fa'
          }}
          onError={(e) => {
            e.target.src = '/api/placeholder/150/150';
          }}
        />
        
        <Button
          variant="primary"
          className="position-absolute bottom-0 end-0 rounded-circle p-2"
          style={{ width: '40px', height: '40px' }}
          onClick={handleFileSelect}
          disabled={loading}
        >
          <Camera size={20} />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>

      {loading && (
        <ProgressBar 
          now={uploadProgress} 
          label={`${uploadProgress}%`}
          className="mb-3"
          animated
        />
      )}

      <small className="text-muted d-block">
        Click the camera icon to update your profile picture
      </small>
      <small className="text-muted d-block">
        Max size: 5MB. Supported formats: JPEG, PNG, GIF, WebP
      </small>
    </div>
  );
};

export default ProfilePictureUpload;