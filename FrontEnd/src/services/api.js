import axios from 'axios';

// Configura a base da API
const api = axios.create({
  baseURL: 'https://sua-api-url.com',
});

// Intercepta requisições para adicionar o token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;