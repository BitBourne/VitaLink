// search/components/SearchHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

export default function SearchHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo VitaLink con gradiente */}
        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
          VitaLink
        </Link>
        
        <div className="flex items-center space-x-4">
          {/* Icono de Notificación */}
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          
          {/* Avatar de Usuario UP con gradiente */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center cursor-pointer">
            <span className="text-white font-semibold text-sm">UP</span>
          </div>
        </div>
      </div>
    </header>
  );
}