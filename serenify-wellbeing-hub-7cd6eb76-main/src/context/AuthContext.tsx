// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// // Create context
// const AuthContext = createContext(null);

// // User type definition
// export interface User {
//   email: string;
//   name?: string;
//   isTherapist?: boolean;
//   role?: string;
//   id: number;
// }

// // API call functions to interact with backend
// const apiLogin = async (formData) => {
//   try {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         password: formData.password,
//       }),
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Erreur de connexion');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// };

// const apiRegister = async (formData) => {
//   try {
//     const response = await fetch('/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         password_confirmation: formData.confirmPassword,
//         role: formData.role,
//         specialty: formData.specialty,
//         experience: formData.experience,
//         bio: formData.bio,
//       }),
//     });
    
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Erreur d\'inscription');
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error('Register error:', error);
//     throw error;
//   }
// };

// // Provider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Initialize auth state from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
    
//     if (storedUser && token) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Failed to parse stored user:', error);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }
    
//     setLoading(false);
//   }, []);

//   // Login function
//   const login = async (formData) => {
//     setLoading(true);
//     try {
//       // Try actual API login
//       let userData;
      
//       try {
//         userData = await apiLogin(formData);
//       } catch (apiError) {
//         console.log('Using mock login due to API error:', apiError);
        
//         // Fall back to mock login if API fails
//         const isTherapist = formData.email.toLowerCase().endsWith('@therapist.com');
        
//         // Mock user data
//         const mockUser = {
//           email: formData.email,
//           name: formData.email.split('@')[0],
//           isTherapist: isTherapist,
//           role: isTherapist ? 'therapist' : 'patient',
//           id: isTherapist ? 1000 + Math.floor(Math.random() * 100) : Math.floor(Math.random() * 100)
//         };
        
//         userData = {
//           user: mockUser,
//           access_token: 'mock_token_' + Math.random().toString(36).substr(2),
//           token_type: 'Bearer'
//         };
//       }
      
//       // Save user data and token
//       localStorage.setItem('user', JSON.stringify(userData.user));
//       localStorage.setItem('token', userData.access_token);
      
//       // Update state
//       setUser(userData.user);
      
//       // Show success message
//       toast.success(
//         userData.user.isTherapist || userData.user.role === 'therapist'
//           ? 'Connexion thérapeute réussie!'
//           : 'Connexion client réussie!'
//       );
      
//       // Navigate based on user role
//       if (userData.user.isTherapist || userData.user.role === 'therapist') {
//         navigate('/therapist-dashboard');
//       } else {
//         navigate('/appointments');
//       }
      
//       return true;
//     } catch (error) {
//       toast.error(error.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register function
//   const register = async (formData) => {
//     setLoading(true);
//     try {
//       // Try actual API registration
//       try {
//         await apiRegister(formData);
//       } catch (error) {
//         console.log('Using mock registration due to API error:', error);
//         // Mock registration just succeeds silently
//       }
      
//       // Show success message
//       const isTherapist = formData.email.toLowerCase().endsWith('@therapist.com');
//       toast.success(
//         isTherapist
//           ? 'Inscription thérapeute réussie! Vous pouvez maintenant vous connecter.'
//           : 'Inscription client réussie! Vous pouvez maintenant vous connecter.'
//       );
      
//       return true;
//     } catch (error) {
//       toast.error(error.message || 'Échec de l\'inscription. Veuillez réessayer.');
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null);
//     toast.success('Déconnexion réussie');
//     navigate('/');
//   };

//   // Value object to be provided to consumers
//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//     isAuthenticated: !!user,
//     isTherapist: user?.isTherapist || user?.role === 'therapist',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook to use the auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// src/context/AuthContext.jsx
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
// import React, { createContext, useState, useContext, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   // Initialize state from localStorage on mount
//   const [currentUser, setCurrentUser] = useState(() => {
//     const savedUser = localStorage.getItem('user');
//     return savedUser ? JSON.parse(savedUser) : null;
//   });
  
//   const [token, setToken] = useState(() => {
//     return localStorage.getItem('token') || null;
//   });
  
//   // Update effect - whenever user or token changes, update localStorage
//   useEffect(() => {
//     if (currentUser) {
//       localStorage.setItem('user', JSON.stringify(currentUser));
//     } else {
//       localStorage.removeItem('user');
//     }
    
//     if (token) {
//       localStorage.setItem('token', token);
//     } else {
//       localStorage.removeItem('token');
//     }
//   }, [currentUser, token]);
  
//   // Function to login a user
//   const login = (userData, accessToken) => {
//     setCurrentUser(userData);
//     setToken(accessToken);
//   };
  
//   // Function to logout
//   const logout = () => {
//     setCurrentUser(null);
//     setToken(null);
//     // Clean up any other auth-related items in localStorage
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };
  
//   // Check if user is a therapist
//   const isTherapist = () => {
//     return currentUser?.isTherapist || currentUser?.role === 'therapist';
//   };
  
//   // The context value that will be provided
//   const value = {
//     currentUser,
//     token,
//     isLoggedIn: Boolean(currentUser),
//     isTherapist: isTherapist(),
//     login,
//     logout
//   };
  
//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook for using auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };