import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../../../auth/hooks/useAuth";
import Header from "../../../../core/ui/Layout/Header";


const PatientLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return "Cargando...";

  // Solo si es paciente (role_id = 2 por ejemplo)
  if (!user?.id || !user.roles?.includes("patient")) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-main-gradient-10 flex flex-col">
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <Header/>
      </header>

      <main className="w-11/12 max-w-6xl mx-auto py-5">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;
