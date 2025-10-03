
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage on mount
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });
  
  const [loading, setLoading] = useState(true);
  
  // Set up axios interceptor for adding token to requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
    
    // Clean up interceptor when component unmounts
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);
  
  // Check token validity on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // You might want to add a dedicated endpoint for token validation
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 200) {
          setCurrentUser(response.data);
        } else {
          // If token is invalid, log the user out
          logout();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        // If there's an error (like 401), clear the auth state
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };
    
    validateToken();
  }, []);
  
  // Update effect - whenever user or token changes, update localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
    
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [currentUser, token]);
  
  // Function to login a user
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      
      const { user, access_token } = response.data;
      
      setCurrentUser(user);
      setToken(access_token);
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      
      // Fallback to mock login for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock login for development');
        
        const isTherapist = email.toLowerCase().endsWith('@therapist.com');
        
        // Mock user data
        const mockUser = {
          email: email,
          name: email.split('@')[0],
          isTherapist: isTherapist,
          id: isTherapist ? 1000 + Math.floor(Math.random() * 100) : Math.floor(Math.random() * 100),
          role: isTherapist ? 'therapist' : 'patient'
        };
        
        const mockToken = 'mock_token_' + Math.random().toString(36).substr(2);
        
        setCurrentUser(mockUser);
        setToken(mockToken);
        
        return { success: true };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || "Échec de la connexion"
      };
    } finally {
      setLoading(false);
    }
  };
  
  // Function to register a user
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:8000/api/register', userData);
      
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      
      // Fallback for development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using mock registration for development');
        return { success: true };
      }
      
      return {
        success: false,
        message: error.response?.data?.message || "Échec de l'inscription"
      };
    } finally {
      setLoading(false);
    }
  };
  
  // Function to logout
  const logout = () => {
    // Attempt to call logout endpoint if token exists
    if (token) {
      axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch(err => console.error("Logout API error:", err));
    }
    
    setCurrentUser(null);
    setToken(null);
    
    // Clean up any other auth-related items in localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };
  
  // Check if user is a therapist
  const isTherapist = () => {
    return currentUser?.isTherapist || currentUser?.role === 'therapist';
  };
  
  // The context value that will be provided
  const value = {
    currentUser,
    token,
    loading,
    isLoggedIn: Boolean(currentUser),
    isTherapist: isTherapist(),
    login,
    register,
    logout
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
