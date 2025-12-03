import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, UserCheck, Calendar, Clock, Activity } from "lucide-react";
import apiClient from "../../../core/api/apiClient";
import { useToast } from "../../../core/ui/Components/ToastProvider";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        pendingVerifications: 0,
        totalAppointments: 0,
        completedToday: 0,
        pendingToday: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Obtener estadísticas consolidadas del nuevo endpoint
            const statsRes = await apiClient.get('/admin/dashboard/stats');
            const statsData = statsRes.data?.data || {};

            // Obtener actividad reciente del nuevo endpoint
            const activityRes = await apiClient.get('/admin/dashboard/recent-activity');
            const activityData = activityRes.data?.data || [];

            setStats({
                totalDoctors: statsData.totalDoctors || 0,
                totalPatients: statsData.totalPatients || 0,
                pendingVerifications: statsData.pendingVerifications || 0,
                totalAppointments: statsData.totalAppointments || 0,
                completedToday: statsData.completedToday || 0,
                pendingToday: statsData.pendingToday || 0
            });

            // Formatear actividad reciente para mostrar
            const formattedActivity = activityData.map(activity => {
                const timeAgo = getTimeAgo(activity.timestamp);
                return {
                    type: activity.type,
                    message: activity.message,
                    actor: activity.actorName,
                    time: timeAgo
                };
            });

            setRecentActivity(formattedActivity);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            // Only show toast on actual API errors, not empty data
            if (error.response?.status && error.response.status >= 400) {
                toast.error('Error al cargar datos del dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    // Función auxiliar para calcular tiempo transcurrido
    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `Hace ${diffMins}m`;
        if (diffHours < 24) return `Hace ${diffHours}h`;
        return `Hace ${diffDays}d`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-gray-600">Cargando panel...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Panel de Control</h2>
                    <p className="text-gray-500 text-sm mt-1">Vista general del sistema</p>
                </div>
                <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid - Minimalist */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Doctores Activos</span>
                        <UserCheck className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Verificaciones Pendientes</span>
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingVerifications}</p>
                    {stats.pendingVerifications > 0 && (
                        <p className="text-xs text-gray-500 mt-2">Requiere atención</p>
                    )}
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Citas Totales</span>
                        <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600">Usuarios Totales</span>
                        <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalDoctors + stats.totalPatients}</p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Today's Overview - 2 columns */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumen de Hoy</h3>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-2">Citas Completadas</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-gray-900">{stats.completedToday}</span>
                                <span className="text-sm text-gray-500">/ {stats.completedToday + stats.pendingToday}</span>
                            </div>
                            <div className="mt-3 bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-gray-900 h-2 rounded-full transition-all"
                                    style={{
                                        width: `${stats.completedToday + stats.pendingToday > 0
                                            ? (stats.completedToday / (stats.completedToday + stats.pendingToday)) * 100
                                            : 0}%`
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 mb-2">Citas Pendientes</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-gray-900">{stats.pendingToday}</span>
                            </div>
                            <div className="mt-3">
                                <p className="text-xs text-gray-500">Por atender hoy</p>
                            </div>
                        </div>
                    </div>

                    {stats.pendingVerifications > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Verificaciones Pendientes</p>
                                    <p className="text-xs text-gray-500 mt-1">{stats.pendingVerifications} doctores esperando aprobación</p>
                                </div>
                                <button
                                    onClick={() => navigate('/admin/verifications')}
                                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Revisar
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Activity - 1 column */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
                    </div>

                    <div className="space-y-4">
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex gap-3">
                                <div className="w-2 h-2 rounded-full bg-gray-300 mt-2" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {activity.actor} • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Resumen del Sistema</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    <div className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                        <span className="text-sm text-gray-600">Doctores Verificados</span>
                        <span className="text-sm font-medium text-gray-900">{stats.totalDoctors - stats.pendingVerifications}</span>
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                        <span className="text-sm text-gray-600">Doctores Pendientes</span>
                        <span className="text-sm font-medium text-gray-900">{stats.pendingVerifications}</span>
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                        <span className="text-sm text-gray-600">Total de Citas</span>
                        <span className="text-sm font-medium text-gray-900">{stats.totalAppointments}</span>
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                        <span className="text-sm text-gray-600">Usuarios Registrados</span>
                        <span className="text-sm font-medium text-gray-900">{stats.totalDoctors + stats.totalPatients}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
