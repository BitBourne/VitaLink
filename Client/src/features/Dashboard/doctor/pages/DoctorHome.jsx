import React, { useEffect, useState } from 'react';
import apiClient from '../../../../core/api/apiClient';
import { CalendarCheck, Users, Clock, AlertCircle, History, UserCheck, ChevronRight } from 'lucide-react';

const DoctorHome = () => {
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    total: 0,
    nextAppointment: null,
    recentHistory: [] // <--- Nuevo estado para la lista
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await apiClient.get('/appointments');
        const appointments = data.appointments || [];

        // 1. Métricas Básicas
        const pending = appointments.filter(a => a.status === 'pending').length;
        const confirmed = appointments.filter(a => a.status === 'confirmed').length;
        
        // 2. Próxima Cita (Lógica existente)
        const upcoming = appointments
            .filter(a => a.status === 'confirmed' || a.status === 'pending')
            .sort((a, b) => new Date(`${a.appointment_date}T${a.appointment_time}`) - new Date(`${b.appointment_date}T${b.appointment_time}`))[0];

        // 3. NUEVO: Historial de Pacientes Atendidos (Completed)
        // Filtramos 'completed', ordenamos descendente (más nuevo primero) y tomamos 5
        const history = appointments
            .filter(a => a.status === 'completed')
            .sort((a, b) => new Date(`${b.appointment_date}T${b.appointment_time}`) - new Date(`${a.appointment_date}T${a.appointment_time}`))
            .slice(0, 5);

        setStats({
          pending,
          confirmed,
          total: appointments.length,
          nextAppointment: upcoming,
          recentHistory: history
        });

      } catch (error) {
        console.error("Error cargando dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse">Cargando estadísticas...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
        <p className="text-gray-500">Resumen de tu actividad reciente.</p>
      </header>

      {/* --- SECCIÓN 1: TARJETAS DE MÉTRICAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Por Atender (Pendientes)" 
            value={stats.pending} 
            icon={Clock} 
            color="text-orange-500" 
            bg="bg-orange-50" 
        />
        <StatCard 
            title="Agenda Confirmada" 
            value={stats.confirmed} 
            icon={CalendarCheck} 
            color="text-[#5EE7DF]" 
            bg="bg-[#5EE7DF]/10" 
        />
        <StatCard 
            title="Total Histórico" 
            value={stats.total} 
            icon={Users} 
            color="text-[#B490CA]" 
            bg="bg-[#B490CA]/10" 
        />
      </div>

      {/* --- SECCIÓN 2: GRID DIVIDIDO --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMNA IZQUIERDA: Próxima Cita (Sticky si hay mucho contenido) */}
        <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <AlertCircle className="text-blue-500" size={20} /> 
                    Siguiente Paciente
                </h2>
                
                {stats.nextAppointment ? (
                    <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                                stats.nextAppointment.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                                {stats.nextAppointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                            </span>
                            <span className="text-xs text-gray-400">#{stats.nextAppointment.id}</span>
                        </div>
                        
                        <div className="mb-4">
                             <p className="text-2xl font-bold text-gray-800">
                                {stats.nextAppointment.appointment_time.slice(0, 5)} hrs
                            </p>
                            <p className="font-medium text-gray-600">
                                {new Date(stats.nextAppointment.appointment_date).toLocaleDateString()}
                            </p>
                        </div>
                        
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Motivo:</p>
                            <p className="text-sm font-medium text-gray-800 italic">
                                "{stats.nextAppointment.reason}"
                            </p>
                        </div>

                        {/* <div className="mt-4 pt-4 border-t border-blue-100">
                             <p className="text-sm font-bold text-gray-700 mb-1">Paciente:</p>
                             <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                                    P
                                </div>
                                <span className="text-sm text-gray-600">
                                    {stats.nextAppointment.patient?.name || `ID: ${stats.nextAppointment.patient_id}`}
                                </span>
                             </div>
                        </div> */}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <CalendarCheck size={32} className="mb-2 opacity-50"/>
                        <p>No hay citas próximas</p>
                    </div>
                )}
            </div>
        </div>

        {/* COLUMNA DERECHA: Historial Reciente */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
                        <History className="text-[#B490CA]" size={20} /> 
                        Últimos Pacientes Atendidos
                    </h2>
                    {/* Botón opcional para ver todo */}
                    {/* <button className="text-sm text-blue-600 hover:underline">Ver historial completo</button> */}
                </div>

                <div className="space-y-4">
                    {stats.recentHistory.length > 0 ? (
                        stats.recentHistory.map((appt) => (
                            <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 hover:bg-white hover:shadow-md transition-all rounded-xl border border-gray-100 group">
                                <div className="flex items-center gap-4">
                                    {/* Icono / Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                        <UserCheck size={20} />
                                    </div>
                                    
                                    {/* Info Principal */}
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            {appt.patient?.name 
                                                ? `${appt.patient.name} ${appt.patient.last_name || ''}`
                                                : `Paciente #${appt.patient_id}`
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            {new Date(appt.appointment_date).toLocaleDateString()} • {appt.appointment_time.slice(0, 5)}
                                        </p>
                                    </div>
                                </div>

                                {/* Motivo y Estado */}
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm text-gray-600 max-w-[200px] truncate">
                                        {appt.reason}
                                    </p>
                                    <span className="text-[10px] uppercase font-bold text-green-600 tracking-wider">
                                        Completada
                                    </span>
                                </div>

                                {/* Flechita Decorativa */}
                                <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={18} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <p>Aún no has completado ninguna cita.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

// Componente pequeño reutilizable para las cards de arriba
const StatCard = ({ title, value, icon: Icon, color, bg }) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

export default DoctorHome;