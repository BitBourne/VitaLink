import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../../../core/api/apiClient';

// 1. Crear el Contexto
const AuthContext = createContext();

// 2. Crear el Proveedor
const AuthProvider = ({ children }) => {
  // Inicializamos en null para saber claramente cuando no hay usuario
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  // --- PASO 1: Definir la función de carga de usuario fuera del useEffect ---
  // Esta función ahora es accesible por todo el componente
  const cargarUsuario = async () => {
      const token = localStorage.getItem('token');

      if(!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
          // Nota: Asegúrate que apiClient envíe el header Authorization automáticamente
          const { data } = await apiClient.get('/auth/profile');
          setUser(data); 
      } catch (error) {
          console.log("Error cargando perfil", error);
          // Si el token no sirve, lo borramos y reseteamos usuario
          localStorage.removeItem('token');
          setUser(null);
      } finally {
          setLoading(false);
      }
  }

  // --- PASO 2: El useEffect solo llama a la función ---
  useEffect(() => {
      cargarUsuario();
  }, [])

  // --- PASO 3: Actualizar la función login ---
  const login = async (token) => {
    localStorage.setItem('token', token);
    
    // Al iniciar sesión, ponemos loading true (opcional, para UX) y recargamos los datos
    setLoading(true);
    await cargarUsuario(); 
    // Al terminar cargarUsuario, el estado 'user' se actualizará y el Header cambiará solo
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

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