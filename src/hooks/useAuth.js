import { useState, useCallback, useEffect } from 'react';
import { api } from '../api/index';
import { authService } from '../api/services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token] = useState(() => localStorage.getItem('token'));

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
      }
      setError('Failed to load user profile');
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
      const data = await authService.login(credentials);
      await fetchUserProfile();
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.response?.data?.non_field_errors?.[0] || 
                          'Login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(userData);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    setLoading(true);
    try {
      const response = await api.profile.update(data);
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Profile update error:', err);
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfilePicture = useCallback(async (file) => {
    setLoading(true);
    try {
      const response = await api.profile.updatePicture(file);
      setUser(prevUser => ({
        ...prevUser,
        profile_picture: response.data.profile_picture
      }));
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Profile picture update error:', err);
      return { success: false, error: 'Failed to update profile picture' };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    updateProfilePicture,
    isAuthenticated: !!token,
  };
};

export default useAuth;