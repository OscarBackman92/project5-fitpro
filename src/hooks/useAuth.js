import { useState, useCallback, useEffect } from 'react';
import { api } from '../api/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.profile.get();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, [token]);

  // Initialize auth state
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Login
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.auth.login(credentials);
      const { key } = response.data;
      
      localStorage.setItem('token', key);
      setToken(key);

      // Fetch user profile after successful login
      const profileResponse = await api.profile.get();
      setUser(profileResponse.data);
      
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.non_field_errors?.[0] || 
                          err.response?.data?.detail ||
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      if (token) {
        await api.auth.logout();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // Update profile
  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await api.profile.update(data);
      setUser(response.data);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          'Failed to update profile';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update profile picture
  const updateProfilePicture = useCallback(async (file) => {
    setLoading(true);
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }

      const response = await api.profile.updatePicture(file);
      
      // Update user state with new profile picture
      setUser(prevUser => ({
        ...prevUser,
        profile_picture: response.data.profile_picture
      }));

      return { 
        success: true, 
        data: response.data 
      };
    } catch (err) {
      const errorMessage = err.message || 
                          err.response?.data?.detail || 
                          'Failed to update profile picture';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    setLoading(true);
    try {
      await api.auth.changePassword({
        old_password: currentPassword,
        new_password: newPassword
      });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          'Failed to change password';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Request password reset
  const requestPasswordReset = useCallback(async (email) => {
    setLoading(true);
    try {
      await api.auth.requestPasswordReset({ email });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          'Failed to send password reset email';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (token, newPassword) => {
    setLoading(true);
    try {
      await api.auth.resetPassword({
        token,
        new_password: newPassword
      });
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 
                          'Failed to reset password';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (!token) return;
    
    try {
      const response = await api.profile.get();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Error refreshing profile:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  return {
    user,
    token,
    loading,
    error,
    initialized,
    isAuthenticated: !!token,
    login,
    logout,
    updateProfile,
    updateProfilePicture,
    changePassword,
    requestPasswordReset,
    resetPassword,
    clearError,
    refreshProfile,
    fetchUserProfile
  };
};

export default useAuth;