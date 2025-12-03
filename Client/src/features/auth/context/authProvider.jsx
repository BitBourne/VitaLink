import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor del Contexto (AuthProvider)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Verifica que el usuario este autenticado
  useEffect(() => {
      const autenticarUsuario = async () => {
        const token = localStorage.getItem('token');

        // en caso de que no encuentre el token detiene la ejecucion del codigo
          if(!token) {
            setLoading(false);
            return;
          }

          try {
              // realiza peticion a backend y se le asigna la configuracion establecida
              const { data } = await apiClient.get('/auth/profile');

              // Agregamos al estado global el JWT
              setUser(data); 
          } catch (error) {
              // console.log(error.response.data.msg)
              setUser({});
          }
          setLoading(false);
      }
      autenticarUsuario();
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token);
    // const decodedUser = jwtDecode(token);
    // setUser({ token, ...decodedUser });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // El valor del contexto que será accesible por los componentes hijos
  const authContextValue = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }
export default AuthContext;