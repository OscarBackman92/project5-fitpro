import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.auth.login(credentials);
      const { key } = response.data;
      setToken(key);
      localStorage.setItem('token', key);
      await fetchUserProfile();
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await api.profile.get();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    }
  }, [token, logout]);

  const value = {
    user,
    token,
    login,
    logout,
    fetchUserProfile
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