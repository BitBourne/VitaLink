import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, X, Ban, Eye, Filter, Loader, UserCog, Download, MapPin, Stethoscope } from "lucide-react";
import apiClient from "../../../core/api/apiClient";
import Table from "../../../core/ui/Components/Table";
import ReassignDoctorModal from "../components/ReassignDoctorModal";

const AppointmentsOverview = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showReassignModal, setShowReassignModal] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        status: 'all',
        dateFrom: '',
        dateTo: '',
        search: ''
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/appointments');
            const rawAppointments = response.data?.appointments || [];

            // Transform appointments to match expected table structure
            const transformedAppointments = rawAppointments.map(apt => {
                // Extract patient info
                const patientName = apt.A_patient
                    ? `${apt.A_patient.name || ''} ${apt.A_patient.last_name || ''}`.trim()
                    : 'N/A';
                const patientEmail = apt.A_patient?.email || 'N/A';

                // Extract doctor info
                const doctorName = apt.A_doctor?.DP_user
                    ? `${apt.A_doctor.DP_user.name || ''} ${apt.A_doctor.DP_user.last_name || ''}`.trim()
                    : 'N/A';

                // Extract specialties
                const specialties = apt.A_doctor?.DP_specialties?.length > 0
                    ? apt.A_doctor.DP_specialties.map(s => s.name).join(', ')
                    : 'N/A';

                return {
                    ...apt,
                    patient_name: patientName,
                    patient_email: patientEmail,
                    doctor_name: doctorName,
                    specialties: specialties,
                    clinic_name: apt.clinic_name || 'N/A',
                    date: apt.appointment_date,
                    time: apt.appointment_time,
                    status: apt.status || 'pending'
                };
            });

            setAppointments(transformedAppointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelAppointment = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const reason = formData.get('reason');

        try {
            setActionLoading(true);
            await apiClient.put(`/admin/appointments/${selectedAppointment.id}/cancel`, { reason });
            setShowCancelModal(false);
            fetchAppointments();
        } catch (error) {
            alert(error.response?.data?.msg || 'Error al cancelar cita');
        } finally {
            setActionLoading(false);
        }
    };

    const handleViewDetails = async (appointment) => {
        setSelectedAppointment(appointment);
        setShowDetailsModal(true);
        setAppointmentDetails(null); // Reset details

        try {
            const response = await apiClient.get(`/admin/appointments/${appointment.id}/details`);
            setAppointmentDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching appointment details:", error);
        }
    };

    const openCancelModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowCancelModal(true);
    };

    const openReassignModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowReassignModal(true);
    };

    const handleExportCSV = () => {
        if (filteredAppointments.length === 0) {
            alert('No hay datos para exportar');
            return;
        }

        const headers = ['ID', 'Paciente', 'Doctor', 'Especialidad', 'Clínica', 'Fecha', 'Hora', 'Estado', 'Motivo'];
        const csvContent = [
            headers.join(','),
            ...filteredAppointments.map(apt => [
                apt.id,
                `"${apt.patient_name}"`,
                `"${apt.doctor_name}"`,
                `"${apt.specialties || ''}"`,
                `"${apt.clinic_name || ''}"`,
                apt.date,
                apt.time,
                apt.status,
                `"${apt.reason || ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `citas_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filter logic
    const filteredAppointments = appointments.filter(apt => {
        // Status filter
        if (filters.status !== 'all' && apt.status !== filters.status) return false;

        // Date range filter
        if (filters.dateFrom && apt.date) {
            const aptDate = new Date(apt.date);
            const fromDate = new Date(filters.dateFrom);
            if (aptDate < fromDate) return false;
        }

        if (filters.dateTo && apt.date) {
            const aptDate = new Date(apt.date);
            const toDate = new Date(filters.dateTo);
            if (aptDate > toDate) return false;
        }

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const patientMatch = apt.patient_name?.toLowerCase().includes(searchLower);
            const doctorMatch = apt.doctor_name?.toLowerCase().includes(searchLower);
            const clinicMatch = apt.clinic_name?.toLowerCase().includes(searchLower);
            if (!patientMatch && !doctorMatch && !clinicMatch) return false;
        }

        return true;
    });

    const columns = [
        {
            header: 'Paciente',
            accessor: 'patient_name',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-medium text-gray-900">{row.patient_name}</div>
                    <div className="text-xs text-gray-500">{row.patient_email}</div>
                </div>
            )
        },
        {
            header: 'Doctor / Especialidad',
            accessor: 'doctor_name',
            sortable: true,
            render: (row) => (
                <div>
                    <div className="font-medium text-gray-900">{row.doctor_name}</div>
                    <div className="text-xs text-gray-500">{row.specialties}</div>
                </div>
            )
        },
        {
            header: 'Fecha',
            accessor: 'date',
            sortable: true,
            render: (row) => row.date ? new Date(row.date).toLocaleDateString('es-MX') : '-'
        },
        {
            header: 'Hora',
            accessor: 'time',
            render: (row) => (
                <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {row.time || '-'}
                </div>
            )
        },
        {
            header: 'Estado',
            accessor: 'status',
            render: (row) => {
                const statusMap = {
                    scheduled: { label: 'Programada', class: 'bg-blue-100 text-blue-800' },
                    confirmed: { label: 'Confirmada', class: 'bg-green-100 text-green-800' },
                    completed: { label: 'Completada', class: 'bg-green-100 text-green-800' },
                    cancelled: { label: 'Cancelada', class: 'bg-red-100 text-red-800' },
                    pending: { label: 'Pendiente', class: 'bg-yellow-100 text-yellow-800' }
                };
                const status = statusMap[row.status] || statusMap.pending;

                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.class}`}>
                        {status.label}
                    </span>
                );
            }
        },
        {
            header: 'Acciones',
            accessor: 'actions',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleViewDetails(row)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Ver detalles completos"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    {row.status !== 'cancelled' && row.status !== 'completed' && (
                        <>
                            <button
                                onClick={() => openReassignModal(row)}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                                title="Reasignar doctor"
                            >
                                <UserCog className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => openCancelModal(row)}
                                disabled={actionLoading}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                                title="Cancelar cita"
                            >
                                <Ban className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestión de Citas</h2>
                    <p className="text-gray-600 mt-1">Visualiza y administra todas las citas del sistema</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Exportar CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <h3 className="font-semibold text-gray-900">Filtros</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        >
                            <option value="all">Todos</option>
                            <option value="scheduled">Programada</option>
                            <option value="confirmed">Confirmada</option>
                            <option value="completed">Completada</option>
                            <option value="cancelled">Cancelada</option>
                            <option value="pending">Pendiente</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                        <input
                            type="text"
                            placeholder="Paciente, doctor o clínica..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-600">Total Citas</div>
                    <div className="text-2xl font-bold text-gray-900 mt-1">{filteredAppointments.length}</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-blue-800">Programadas</div>
                    <div className="text-2xl font-bold text-blue-900 mt-1">
                        {filteredAppointments.filter(a => a.status === 'scheduled' || a.status === 'confirmed').length}
                    </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-green-800">Completadas</div>
                    <div className="text-2xl font-bold text-green-900 mt-1">
                        {filteredAppointments.filter(a => a.status === 'completed').length}
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-sm font-medium text-red-800">Canceladas</div>
                    <div className="text-2xl font-bold text-red-900 mt-1">
                        {filteredAppointments.filter(a => a.status === 'cancelled').length}
                    </div>
                </div>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                data={filteredAppointments}
                emptyMessage="No hay citas que coincidan con los filtros"
            />

            {/* Details Modal */}
            {showDetailsModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Detalles Completos de la Cita</h3>
                            <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {!appointmentDetails ? (
                            <div className="flex justify-center py-12">
                                <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Información del Paciente */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <User className="w-4 h-4" /> Paciente
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-500">Nombre:</span> {appointmentDetails.patient?.name}</p>
                                        <p><span className="text-gray-500">Email:</span> {appointmentDetails.patient?.email}</p>
                                        <p><span className="text-gray-500">Teléfono:</span> {appointmentDetails.patient?.phone || 'No registrado'}</p>
                                    </div>
                                </div>

                                {/* Información del Doctor */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4" /> Doctor
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-500">Nombre:</span> {appointmentDetails.doctor?.name}</p>
                                        <p><span className="text-gray-500">Especialidad:</span> {appointmentDetails.doctor?.specialties?.map(s => s.name).join(', ') || 'N/A'}</p>
                                        <p><span className="text-gray-500">Licencia:</span> {appointmentDetails.doctor?.license_number || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Detalles de la Cita */}
                                <div className="md:col-span-2 bg-white border border-gray-200 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Detalles del Servicio
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="mb-1"><span className="text-gray-500">Fecha:</span> {new Date(appointmentDetails.date).toLocaleDateString('es-MX')}</p>
                                            <p className="mb-1"><span className="text-gray-500">Hora:</span> {appointmentDetails.time}</p>
                                            <p className="mb-1"><span className="text-gray-500">Estado:</span> <span className="font-medium uppercase">{appointmentDetails.status}</span></p>
                                            <p className="mb-1"><span className="text-gray-500">Tipo:</span> {appointmentDetails.is_telemedicine ? 'Telemedicina' : 'Presencial'}</p>
                                        </div>
                                        <div>
                                            <p className="mb-1"><span className="text-gray-500">Clínica:</span> {appointmentDetails.clinic?.name || 'N/A'}</p>
                                            <p className="mb-1"><span className="text-gray-500">Dirección:</span> {appointmentDetails.clinic?.address || 'N/A'}</p>
                                            {appointmentDetails.meeting_link && (
                                                <p className="mb-1"><span className="text-gray-500">Link:</span> <a href={appointmentDetails.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Unirse a reunión</a></p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-700 mb-1">Motivo de consulta:</p>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{appointmentDetails.reason}</p>
                                    </div>

                                    {appointmentDetails.notes && (
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Notas médicas:</p>
                                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{appointmentDetails.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reassign Modal */}
            {showReassignModal && selectedAppointment && (
                <ReassignDoctorModal
                    appointment={selectedAppointment}
                    onClose={() => setShowReassignModal(false)}
                    onSuccess={() => {
                        fetchAppointments();
                        setShowReassignModal(false);
                    }}
                />
            )}

            {/* Cancel Modal */}
            {showCancelModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Cancelar Cita</h3>
                        <p className="text-gray-600 mb-4">
                            ¿Está seguro de cancelar la cita de <strong>{selectedAppointment.patient_name}</strong> con
                            <strong> {selectedAppointment.doctor_name}</strong>?
                        </p>
                        <form onSubmit={handleCancelAppointment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Razón de Cancelación *</label>
                                <textarea
                                    name="reason"
                                    required
                                    rows={3}
                                    placeholder="Explique el motivo de la cancelación..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCancelModal(false)}
                                    disabled={actionLoading}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
                                >
                                    Volver
                                </button>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {actionLoading && <Loader className="w-4 h-4 animate-spin" />}
                                    Cancelar Cita
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentsOverview;
