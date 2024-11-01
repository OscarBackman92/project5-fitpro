// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await api.profile.get();
          setUser(response.data);
        } catch (err) {
          console.error('Failed to load user:', err);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.auth.login(credentials);
      setToken(response.data.key);
      const profileResponse = await api.profile.get();
      setUser(profileResponse.data);
      return { success: true };
    } catch (err) {
      setError('Invalid credentials');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      await api.auth.register(userData);
      return { success: true };
    } catch (err) {
      const error = err.response?.data?.message || 'Registration failed';
      setError(error);
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    try {
      setError(null);
      const response = await api.profile.update(data);
      setUser(response.data);
      return { success: true };
    } catch (err) {
      const error = 'Failed to update profile';
      setError(error);
      return { success: false, error };
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!token,
  };

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