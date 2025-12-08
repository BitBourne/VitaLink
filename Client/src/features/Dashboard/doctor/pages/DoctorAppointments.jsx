import React, { useEffect, useState } from 'react';
import apiClient from '../../../../core/api/apiClient';
import { Check, X, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Calendar from '../../../Citas/components/Calendar';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS PARA PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Cantidad de filas por página

  const fetchAppointments = async () => {
    try {
      const { data } = await apiClient.get('/appointments');
      // Opcional: Ordenar por fecha (más reciente primero)
      const sortedData = (data.appointments || []).sort((a, b) => 
         new Date(b.appointment_date) - new Date(a.appointment_date)
      );
      setAppointments(sortedData);
    } catch (error) {
      console.error("Error fetching appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAction = async (id, action) => {
    try {
        await apiClient.put(`/appointments/${id}/${action}`);
        fetchAppointments(); 
    } catch (error) {
        alert("Error al actualizar la cita");
    }
  };

  // --- LÓGICA MATEMÁTICA DE PAGINACIÓN ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  // Cambio de página
  const nextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div className="p-8 animate-pulse">Cargando agenda...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Citas</h1>
            <p className="text-gray-500 text-sm">Administra tu agenda y pacientes.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold">
            Total: {appointments.length} Citas
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full min-h-[500px]">
        <Calendar/>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full min-h-[500px]">
        <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4">Fecha/Hora</th>
                        <th className="p-4">Paciente</th>
                        <th className="p-4">Motivo</th>
                        <th className="p-4">Estado</th>
                        {/* <th className="p-4 text-center">Acciones</th> */}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {/* AQUI USAMOS currentAppointments EN LUGAR DE appointments */}
                    {currentAppointments.length > 0 ? (
                        currentAppointments.map((appt) => (
                            <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-gray-800 flex items-center gap-2">
                                        {/* <Calendar size={14} className="text-gray-400"/> */}
                                        {appt.appointment_date}
                                        {/* {console.log(appt.A_patient.name)} */}
                                    </div>
                                    <div className="text-xs text-gray-500 ml-6">{appt.appointment_time.slice(0,5)} hrs</div>
                                </td>
                                <td className="p-4">
                                    {/* Ajuste de nombre con fallback */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                            {(appt.patient?.name || "P").charAt(0)}
                                        </div>
                                        <span className="font-semibold text-sm text-gray-700">
                                            {appt?.A_patient.name ? `${appt.A_patient.name} ${appt.A_patient.last_name || ''}` : `ID: ${appt.patient_id}`}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600 text-sm max-w-xs truncate" title={appt.reason}>
                                    {appt.reason}
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={appt.status} />
                                </td>
                                {/* <td className="p-4 flex justify-center gap-2">
                                    {appt.status === 'pending' && (
                                        <>
                                            {console.log( "id appt: " + appt.id)}
                                            <ActionButton onClick={() => handleAction(appt.id, 'confirm')} icon={Check} color="text-green-600 bg-green-50 hover:bg-green-100" title="Confirmar" />
                                            <ActionButton onClick={() => handleAction(appt.id, 'cancel')} icon={X} color="text-red-600 bg-red-50 hover:bg-red-100" title="Cancelar" />
                                        </>
                                    )}
                                    {appt.status === 'confirmed' && (
                                        <button 
                                            onClick={() => handleAction(appt.id, 'complete')}
                                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                                        >
                                            <CheckCircle size={14} /> Finalizar
                                        </button>
                                    )}
                                    {['completed', 'cancelled'].includes(appt.status) && (
                                        <span className="text-xs text-gray-400 font-medium">-</span>
                                    )}
                                </td> */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="p-12 text-center text-gray-400">
                                No tienes citas registradas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* --- BARRA DE PAGINACIÓN --- */}
        {appointments.length > itemsPerPage && (
            <div className="bg-white border-t border-gray-200 p-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    Mostrando <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span> a <span className="font-bold text-gray-800">{Math.min(indexOfLastItem, appointments.length)}</span> de <span className="font-bold text-gray-800">{appointments.length}</span> resultados
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                            currentPage === 1 
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                        }`}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    
                    <div className="px-4 py-1.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 border border-gray-200">
                        Página {currentPage} de {totalPages}
                    </div>

                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg border flex items-center justify-center transition-all ${
                            currentPage === totalPages 
                            ? 'border-gray-100 text-gray-300 cursor-not-allowed' 
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                        }`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

// Componentes auxiliares (StatusBadge y ActionButton) se mantienen igual que antes
const StatusBadge = ({ status }) => {
    const styles = {
        pending: "bg-orange-50 text-orange-600 border-orange-100 ring-orange-500/20",
        confirmed: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-500/20",
        completed: "bg-green-50 text-green-600 border-green-100 ring-green-500/20",
        cancelled: "bg-red-50 text-red-600 border-red-100 ring-red-500/20",
    };
    const labels = {
        pending: "Pendiente",
        confirmed: "Confirmada",
        completed: "Finalizada",
        cancelled: "Cancelada"
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ring-1 ring-inset ${styles[status] || "bg-gray-50 text-gray-600"}`}>
            {labels[status] || status}
        </span>
    );
};

const ActionButton = ({ onClick, icon: Icon, color, title }) => (
    <button 
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded-lg transition-colors ${color}`}
    >
        <Icon size={16} />
    </button>
);

export default DoctorAppointments;