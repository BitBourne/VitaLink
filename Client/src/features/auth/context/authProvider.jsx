import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient'; 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({ accessToken: null }); // Estado para token

  // Verifica que el usuario este autenticado
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      } 

      try {
        const { data } = await apiClient.get('/auth/profile');
        setUser(data);
        setAuth({ accessToken: token }); //  Guardar token en estado
      } catch (error) {
        console.log(error.response?.data?.msg || 'Error de autenticación');
        setUser({});
        setAuth({ accessToken: null });
      }
      setLoading(false);
    };
    autenticarUsuario();
  }, []);

  //  FUNCIÓN REFRESH TOKEN ( necesita el interceptor)
  const refresh = async () => {
    try {
      
      const response = await apiClient.post('/auth/refresh');
      const newToken = response.data.token;
      
      localStorage.setItem('token', newToken);
      setAuth({ accessToken: newToken });
      
      return newToken;
    } catch (error) {
      console.error('Error refrescando token:', error);
      logout();
      throw error;
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ accessToken: token }); //  Actualizar estado
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAuth({ accessToken: null }); //  Limpiar token
  };

  //  Actualizar token para el interceptor
  const updateToken = (newToken) => {
    setAuth({ accessToken: newToken });
  };

  const authContextValue = {
    user,
    auth,        //  Exportar auth state
    login,
    logout,
    refresh,     //  Exportar funcion refresh
    updateToken, //  Exportar updateToken
    loading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;