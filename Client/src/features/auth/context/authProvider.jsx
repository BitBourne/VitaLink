import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';

const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);


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

              setUser(data); 
          } catch (error) {
            
              setUser({});
          }
          setLoading(false);
      }
      autenticarUsuario();
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token);
  
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