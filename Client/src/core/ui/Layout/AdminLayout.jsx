import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    UserCheck,
    Users,
    Calendar,
    FileText,
    Settings,
    Building2,
    Stethoscope,
    User
} from "lucide-react";
import useAuth from "../../../features/auth/hooks/useAuth";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const AdminLayout = () => {
    const { user, loading, logout } = useAuth();
    const location = useLocation();

    // Todos los hooks deben estar antes de cualquier return condicional
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
                <p className="text-sm text-gray-500">Cargando...</p>
            </div>
        </div>
    );

    if (!user?.id) return <Navigate to="/admin/login" />;

    const isAdmin = user.roles && user.roles.some(r => r.toLowerCase() === 'admin');

    if (!isAdmin) return <Navigate to="/" />;

    const navigation = [
        {
            title: "Principal",
            items: [
                { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
            ]
        },
        {
            title: "Gestión de Usuarios",
            items: [
                {
                    name: 'Usuarios',
                    icon: Users,
                    subItems: [
                        { name: 'Lista de Usuarios', href: '/admin/users' },
                        { name: 'Verificaciones', href: '/admin/verifications' },
                    ]
                },
            ]
        },
        {
            title: "Clínica",
            items: [
                { name: 'Clínicas', href: '/admin/clinics', icon: Building2 },
                { name: 'Especialidades', href: '/admin/specialties', icon: Stethoscope },
                { name: 'Citas', href: '/admin/appointments', icon: Calendar },
            ]
        },
        {
            title: "Sistema",
            items: [
                {
                    name: 'Administración',
                    icon: Settings,
                    subItems: [
                        { name: 'Roles y Permisos', href: '/admin/roles-permissions' },
                        { name: 'Auditoría', href: '/admin/audit-logs' },
                        { name: 'Mi Perfil', href: '/admin/profile', icon: User },
                    ]
                }
            ]
        }
    ];

    // Helper to find current page title from nested navigation
    const findCurrentPage = (nav, path) => {
        for (const group of nav) {
            for (const item of group.items) {
                if (item.href === path) return item;
                if (item.subItems) {
                    const subItem = item.subItems.find(sub => sub.href === path);
                    if (subItem) return subItem;
                }
            }
        }
        return null;
    };

    const currentPage = findCurrentPage(navigation, location.pathname);

    return (
        <div className="min-h-screen bg-white">
            <Sidebar
                navigation={navigation}
                currentPath={location.pathname}
                user={user}
                onLogout={logout}
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <main className={`min-h-screen flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
                <Header
                    title={currentPage?.name || 'Admin Panel'}
                    user={user}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                />

                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
