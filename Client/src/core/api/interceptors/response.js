export const setupResponseInterceptor = (axiosInstance, refreshToken, onUnauthorized) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      // Log exitoso 
      if (import.meta.env.DEV) {
        console.log(` [API Response] ${response.status} ${response.config.url}`);
      }
      return response;
    },
    async (error) => {
      const originalRequest = error?.config;
      
      //  error 
      if (import.meta.env.DEV) {
        console.error(` [API Error] ${error.response?.status} ${error.config?.url}`);
      }
      
      // Token expirado - intentar refresh
      if (error.response?.status === 401 && !originalRequest?._retry && refreshToken) {
        originalRequest._retry = true;
        
        try {
          // refresh 
          if (import.meta.env.DEV) {
            console.log(' [Token Refresh] Attempting token refresh...');
          }
          
          await refreshToken();
          
          // Reintentar request original
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          //  error de refresh 
          if (import.meta.env.DEV) {
            console.error(' [Token Refresh Failed]:', refreshError);
          }
          
          if (onUnauthorized) {
            onUnauthorized();
          }
          return Promise.reject(refreshError);
        }
      }
      
      // Manejo específico de errores
      if (error.response?.status === 403) {
        //  forbidden 
        if (import.meta.env.DEV) {
          console.error(' [Access Forbidden]');
        }
        
        if (onUnauthorized) {
          onUnauthorized();
        }
      }
      
      // Timeout
      if (error.code === 'ECONNABORTED') {
        // timeout 
        if (import.meta.env.DEV) {
          console.error(' [Request Timeout]');
        }
        
        error.message = 'La solicitud tardó demasiado tiempo. Por favor, intenta nuevamente.';
      }
      
      // Sin conexión
      if (!error.response) {
        // Log de network error 
        if (import.meta.env.DEV) {
          console.error(' [Network Error]');
        }
        
        error.message = 'Error de conexión. Verifica tu conexión a internet.';
      }
      
      return Promise.reject(error);
    }
  );
};