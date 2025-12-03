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
      try {
        // realiza peticion a backend y se le asigna la configuracion establecida
        // La cookie se envía automáticamente gracias a withCredentials: true en apiClient
        const { data } = await apiClient.get('/auth/profile');

        // Agregamos al estado global el usuario
        setUser(data);
      } catch (error) {
        // Si falla (401/403), asumimos que no hay sesión válida
        setUser({});
      }
      setLoading(false);
    }
    autenticarUsuario();
  }, [])

  const login = (token) => {
    // Ya no necesitamos guardar el token en localStorage.
    // El backend establece la cookie 'token' automáticamente.
    // Solo necesitamos refrescar el estado del usuario si es necesario,
    // o dejar que la redirección maneje el flujo.
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser({});
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await apiClient.get('/auth/profile');
      setUser(data);
      return data;
    } catch (error) {
      setUser({});
      throw error;
    }
  };

  // El valor del contexto que será accesible por los componentes hijos
  const authContextValue = {
    user,
    login,
    logout,
    loading,
    refreshUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }
export default AuthContext;