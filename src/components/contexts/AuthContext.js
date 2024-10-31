import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api } from '../../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.profile.get();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.auth.login(credentials);
      const { key } = response.data;
      setToken(key);
      localStorage.setItem('token', key);
      // After setting token, fetch user profile
      const profileResponse = await api.profile.get();
      setUser(profileResponse.data);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.non_field_errors?.[0] || 'Login failed'
      };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await api.auth.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const updateProfile = useCallback(async (data) => {
    try {
      const response = await api.profile.update(data);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: 'Failed to update profile'
      };
    }
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    fetchUserProfile,
    updateProfile
  };

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};