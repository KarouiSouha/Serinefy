// src/services/apiService.js
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - could redirect to login
    if (error.response && error.response.status === 401) {
      console.log('Authentication error', error);
      // Optional: Clear localStorage and redirect to login
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;