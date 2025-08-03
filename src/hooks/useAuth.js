import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user exists and token is valid
    if (user && user.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [user]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 1,
              name: 'Nguyễn Văn A',
              email: credentials.email,
              avatar: 'https://via.placeholder.com/150',
              role: 'student',
              points: 1250,
              level: 'Intermediate'
            },
            token: 'fake-jwt-token'
          });
        }, 1000);
      });

      setUser(response);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 2,
              name: userData.name,
              email: userData.email,
              avatar: 'https://via.placeholder.com/150',
              role: 'student',
              points: 0,
              level: 'Beginner'
            },
            token: 'fake-jwt-token'
          });
        }, 1000);
      });

      setUser(response);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      // Simulate API call
      const updatedUser = {
        ...user,
        user: {
          ...user.user,
          ...profileData
        }
      };
      
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    user: user?.user || null,
    isAuthenticated,
    loading,
    login,
    logout,
    register,
    updateProfile
  };
}; 