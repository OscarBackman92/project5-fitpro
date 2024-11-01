import { useState, useCallback, useEffect } from 'react';
import { api } from '../../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

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
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
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
    }
  }, [token]);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await api.profile.update(data);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      console.error('Profile update error:', err);
      return { 
        success: false, 
        error: 'Failed to update profile'
      };
    } finally {
      setLoading(false);
    }
  }, []);

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
      
      // Refresh user data to get new profile picture
      await fetchUserProfile();
      
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.message || 
                          err.response?.data?.message || 
                          'Failed to update profile picture';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    updateProfile,
    updateProfilePicture,
    fetchUserProfile,
    isAuthenticated: !!token,
  };
};

export default useAuth;