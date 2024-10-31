import React, { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const fetchUserProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await api.profile.get();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle logout
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }, [token]); // Only depend on token

  const login = useCallback(async (credentials) => {
    try {
      const response = await api.auth.login(credentials);
      const { key } = response.data;
      setToken(key);
      localStorage.setItem('token', key);
      // After setting token, fetch user profile
      const profileResponse = await api.profile.get();
      setUser(profileResponse.data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []); // No dependencies needed as we're not using any external values

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []); // No dependencies needed

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