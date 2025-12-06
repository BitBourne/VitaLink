import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // 1. Importamos useNavigate

// Context
import useAuth from "../hooks/useAuth";

// Components
import Header from "../../../core/ui/layout/Header";

const AuthLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya NO está cargando Y el usuario tiene datos (está logueado)
    if (!loading && user?.id) { 
      navigate("/"); 
    }
  }, [user, loading, navigate]);

  
  if (loading) return 'Cargando contenido...';

  if (user?.id) return null; 

  return (
    <div className="min-h-screen flex flex-col bg-main-gradient-15">
      <Header showOptions={false} />

      <main className="flex-grow flex items-center justify-center">
        <div className="w-11/12 md:w-3/5 md:max-w-md md:mx-auto my-5 bg-white rounded-xl shadow-lg px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;