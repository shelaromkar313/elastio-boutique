import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Set the default Authorization header if token exists
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      // Fetch user data if we just loaded the app with a token
      fetchUser();
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await api.post('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    setToken(response.data.access_token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (name, email, password, role = 'customer') => {
    const response = await api.post('/auth/register', { name, email, password, role });
    // Usually register doesn't log you in directly, or maybe it does. Let's assume it doesn't return a token in our current backend, so user must log in after.
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Error during logout", error);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
