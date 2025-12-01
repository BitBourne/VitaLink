export const setupRequestInterceptor = (axiosInstance, getAccessToken) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      // Agregar token si existe y es una ruta protegida
      if (getAccessToken && !config.headers['Authorization'] && !config.headers['authorization']) {
        const token = getAccessToken();
        if (token && config.url && !config.url.includes('/auth/')) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
      
      // en Desarrollo
      if (import.meta.env.DEV) {
        console.log(` [API Request] ${config.method?.toUpperCase()} ${config.url}`);
      }
      
      return config;
    },
    (error) => {
      console.error('[Request Interceptor Error]:', error);
      return Promise.reject(error);
    }
  );
};