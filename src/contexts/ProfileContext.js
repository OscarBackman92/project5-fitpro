import React, { createContext, useContext, useCallback, useState } from 'react';
import { api } from '../api/api';


const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleProfilePictureUpload = useCallback(async (file) => {
    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const response = await api.profile.updatePicture(file, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          err.response?.data?.message || 
                          'Failed to update profile picture';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  }, []);

  const value = {
    loading,
    error,
    uploadProgress,
    handleProfilePictureUpload,
    setError
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};