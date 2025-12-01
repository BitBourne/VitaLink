import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

export default function MainHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-transparent bg-clip-text">
            VitaLink
          </h1>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/especialidades" className="text-gray-700 hover:text-[#B490CA] font-medium">
              Especialidades
            </Link>
            <Link to="/unirme" className="text-gray-700 hover:text-[#B490CA] font-medium">
              Unirme
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-[#B490CA] font-medium">
              Inicia sesión
            </Link>
            
            <button className="border border-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-[#B490CA] px-6 py-2 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#B490CA] hover:to-[#5EE7DF] hover:text-white transition-all">
              Trabaja con nosotros
            </button>
          </nav>

          {/* HAMBURGUESA */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="w-8 h-8 text-gray-700" />
          </button>
        </div>

        {/* MENU MOVIL */}
        {open && (
          <div className="flex flex-col space-y-4 mt-4 md:hidden pb-4">
            <Link to="/especialidades" className="text-gray-700">
              Especialidades
            </Link>
            <Link to="/unirme" className="text-gray-700">
              Unirme
            </Link>
            <Link to="/login" className="text-gray-700">
              Inicia sesión
            </Link>

            <button className="border border-[#B490CA] text-[#B490CA] px-6 py-2 rounded-lg font-medium">
              Trabaja con nosotros
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
