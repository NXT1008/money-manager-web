import axios from 'axios';
import { BASE_URL } from './apiEndpoint';

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

// List of endpoints that do not require authentication headers
const publicEndpoints = ["/login", "/register", "/status", "/active", "/health"];

axiosConfig.interceptors.request.use(config => {
  const shouldSkipToken = publicEndpoints.some(endpoint =>
    config.url?.includes(endpoint));

  if (!shouldSkipToken) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return config;
}, error => {
  return Promise.reject(error);
});

axiosConfig.interceptors.response.use(response => {
  return response;
}, error => { 
  if (error.response) {
    if (error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized access - redirecting to login');
      window.location.href = '/login';
    } else if (error.response.status === 500) {
      // Handle forbidden access
      console.error('Server error - please try again later');
    }
  } else if (error.code === 'ECONNABORTED') {
    // Handle timeout error
    console.error('Request timed out - please try again later');
  }
  return Promise.reject(error);
})

export default axiosConfig;
