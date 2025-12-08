import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../../features/auth/hooks/useAuth';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Cargando sesión...</div>;

  // 1. Si no hay usuario, mandar al login
  if (!user?.id) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Si hay roles permitidos y el usuario no tiene uno de ellos, mandar a 404 o Home
  // Según tu API: 1=Admin, 2=Doctor, 3=Paciente
  if (allowedRoles && !allowedRoles.includes(user.roles[1])) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;