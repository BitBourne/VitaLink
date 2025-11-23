import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";


const UserLayout = () => {

    const { user, loading } = useAuth();

    if(loading) return 'Cargando contenido...';


    return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">

      {/* Header */}
      <header className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="flex items-center gap-2 text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
          VitaLink 
          <span className="text-lg text-gray-400 font-normal">|{user.role_id == 1 ? ' Doctor' : ' Paciente'}</span> 
        </h1>

        <div className="flex items-center gap-6">
          {/* <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-indigo-500 transition" /> */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] flex items-center justify-center text-white font-semibold">
            UP
          </div>
        </div>
      </header>

        {/* Verifica que user._id exista y muestra contenido condicionalmente */}
        { user?.id ? (
            // Contenido
            <main className="flex-1 px-8 py-10">
                <Outlet/>
            </main>
        ) : <Navigate to='/' />}

            
    </div>
  );
}

export default UserLayout;