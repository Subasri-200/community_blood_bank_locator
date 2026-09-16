import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT token if present in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bloodBankToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Extract error messages neatly
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// Auth APIs
export const loginApi = (credentials) => api.post('/auth/login', credentials);
export const registerApi = (userData) => api.post('/auth/register', userData);
export const getProfileApi = () => api.get('/auth/profile');

// Blood Bank APIs
export const getBloodBanksApi = (params) => api.get('/bloodbanks', { params });
export const searchBloodBanksApi = (city, bloodGroup) =>
  api.get('/bloodbanks/search', { params: { city, bloodGroup } });
export const getBloodBankByIdApi = (id) => api.get(`/bloodbanks/${id}`);
export const createBloodBankApi = (data) => api.post('/bloodbanks', data);
export const updateBloodBankApi = (id, data) => api.put(`/bloodbanks/${id}`, data);
export const deleteBloodBankApi = (id) => api.delete(`/bloodbanks/${id}`);

// Blood Request APIs
export const createBloodRequestApi = (requestData) => api.post('/requests', requestData);
export const getMyRequestsApi = () => api.get('/requests/my');
export const getAllRequestsApi = () => api.get('/requests');
export const updateRequestStatusApi = (id, statusData) => api.put(`/requests/${id}`, statusData);
export const deleteBloodRequestApi = (id) => api.delete(`/requests/${id}`);

// User APIs (Admin)
export const getUsersApi = () => api.get('/users');
export const getUserByIdApi = (id) => api.get(`/users/${id}`);
export const deleteUserApi = (id) => api.delete(`/users/${id}`);

export default api;
