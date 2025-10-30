import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor del Contexto (AuthProvider)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Efecto para inicializar el estado desde localStorage al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser({ token, ...decodedUser });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    setUser({ token, ...decodedUser });
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
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }

export default AuthContext;