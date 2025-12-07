import React, { useState } from "react";
import { Bell, User, Menu } from "lucide-react";

export default function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + Menu Mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-sm font-bold text-white">C+</span>
            </div>
            <span className="hidden sm:inline-block text-lg font-semibold text-gray-900">
              Clínica Plus
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a className="text-sm font-medium text-gray-900 hover:text-blue-600 transition">Dashboard</a>
          <a className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Citas</a>
          <a className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Historial</a>
          <a className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Mensajes</a>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-3 relative">
          {/* Notificaciones */}
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
          </button>

          {/* Dropdown User */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <User className="h-5 w-5" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border text-sm z-50">
                <div className="px-3 py-2 text-gray-500 font-medium border-b">Mi Cuenta</div>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100">Perfil</button>
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100">Configuración</button>
                <hr />
                <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden border-t bg-gray-50 px-4 py-3 space-y-3">
          <a className="block text-sm font-medium text-gray-900 hover:text-blue-600">Dashboard</a>
          <a className="block text-sm font-medium text-gray-700 hover:text-blue-600">Citas</a>
          <a className="block text-sm font-medium text-gray-700 hover:text-blue-600">Historial</a>
          <a className="block text-sm font-medium text-gray-700 hover:text-blue-600">Mensajes</a>
        </nav>
      )}
    </header>
  );
}
