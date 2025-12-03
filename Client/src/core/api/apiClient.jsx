import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true // Enable cookies
});

// Interceptor: Se ejecuta ANTES de cada petición.
apiClient.interceptors.request.use(
  (config) => {
    // No need to manually add token from localStorage anymore
    return config;
  },
  (error) => {
    // Si hay un error, lo rechazamos para que sea manejado por un .catch()
    return Promise.reject(error);
  }
);

export default apiClient;