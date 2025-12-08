import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Clock, User, LogOut } from 'lucide-react';
import useAuth from '../../../auth/hooks/useAuth';

const DoctorLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return "Cargando...";

  // Solo si es paciente (role_id = 2 por ejemplo)
  if (!user?.id || !user.roles?.includes("doctor")) return <Navigate to="/" />;






  const handleLogout = () => {
    logout();
    navigate('/auth');
  };



  const menuItems = [
    { label: 'Resumen', icon: LayoutDashboard, path: '/doctor/dashboard' },
    { label: 'Mis Citas', icon: Calendar, path: '/doctor/appointments' },
    { label: 'Disponibilidad', icon: Clock, path: '/doctor/availability' },
    { label: 'Mi Perfil', icon: User, path: '/doctor/profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2">
            {/* Logo Simulado */}
            <div className="w-8 h-8 rounded-lg bg-main-gradient"></div>
            <span className="text-xl font-bold bg-main-gradient text-transparent bg-clip-text">
                VitaLink Dr.
            </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/doctor/dashboard'} // 'end' para que coincida exacto
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
                ${isActive 
                  ? 'bg-main-gradient-10 text-[#B490CA]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                    {user?.name?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">Dr. {user?.last_name}</p>
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 w-full px-2 py-2 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
                <LogOut size={18} /> Cerrar Sesión
            </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DoctorLayout;