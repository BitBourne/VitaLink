import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Interceptor: Se ejecuta ANTES de cada petición.
apiClient.interceptors.request.use(
  (config) => {
    // Recuperamos el token de localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Si el token existe, lo añadimos a la cabecera Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Si hay un error, lo rechazamos para que sea manejado por un .catch()
    return Promise.reject(error);
  }
);

export default apiClient;