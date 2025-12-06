import React, { useState } from "react";
import { User, LogOut, ChevronDown } from "lucide-react"; // Asegúrate de tener lucide-react instalado

import useAuth from "../../../features/auth/hooks/useAuth";


export default function UserMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  // Fallback: Si no hay foto, usamos la inicial del nombre
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative">
      {/* --- BOTÓN PRINCIPAL (AVATAR) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none transition-opacity hover:opacity-80"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden shadow-xs flex items-center justify-center bg-main-gradient">
          {user?.image ? (
            <img
              src={user.image}
              alt="Perfil"
              className="w-full h-full object-cover"
            />
          ) : (
            // Si no hay imagen, mostramos la inicial o un ícono
            <span className="text-xl font-bold text-white">{userInitial}</span>
          )}
        </div>
        
        {/* Flechita pequeña (opcional, ayuda visual) */}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* --- MENÚ DESPLEGABLE --- */}
      {isOpen && (
        <>
          {/* Overlay transparente para cerrar al hacer clic fuera */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-20 overflow-hidden animation-fade-in-up">
            {/* Encabezado del menú con datos del usuario */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <p className="font-bold text-gray-800 truncate">{user?.name} {user?.last_name || "Usuario"}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email || "correo@ejemplo.com"}</p>
            </div>

            {/* Opciones del menú */}
            <div className="p-2 flex flex-col gap-1">
              <button className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <User size={16} />
                Mi Perfil
              </button>
              
              {/* Puedes agregar más opciones aquí */}
              
              <hr className="my-1 border-gray-100" />
              
              <button 
                className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => {
                    // Aquí tu lógica de logout
                    logout();
                }}
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}