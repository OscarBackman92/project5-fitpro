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
      console.error('Error fetching user profile:', err);
      setError('Failed to fetch user profile');
      // If unauthorized, clear auth state
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

  const updateProfile = useCallback(async (profileData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.profile.update(profileData);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfilePicture = useCallback(async (file) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.profile.updatePicture(file);
      setUser(prev => ({
        ...prev,
        profile_picture: response.data.profile_picture
      }));
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to update profile picture';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);

    try {
      await api.auth.register(userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    register,
    updateProfile,
    updateProfilePicture,
    fetchUserProfile,
    isAuthenticated: !!token,
  };
};

export default useAuth;