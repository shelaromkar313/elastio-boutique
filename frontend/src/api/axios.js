import axios from 'axios';

// Create a customized axios instance
const api = axios.create({
  // Since we set up a proxy in vite.config.js, we can just use '/api'
  baseURL: '/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Set withCredentials to true if you are using Laravel Sanctum for CSRF and authentication
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can attach tokens here if using JWT
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors, e.g., 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
