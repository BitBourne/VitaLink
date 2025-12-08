import React, { useState, useEffect } from 'react';
import { X, Search, User, Loader, AlertCircle } from 'lucide-react';
import apiClient from '../../../core/api/apiClient';

const ReassignDoctorModal = ({ appointment, onClose, onSuccess }) => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            // Fetch only verified doctors for reassignment
            const response = await apiClient.get('/doctor?verifiedOnly=true');
            setDoctors(response.data || []);
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReassign = async () => {
        if (!selectedDoctor) return;

        try {
            setSubmitting(true);
            await apiClient.put(`/admin/appointments/${appointment.id}/reassign`, {
                doctor_profile_id: selectedDoctor.id
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error reassigning doctor:", error);
            const errorMessage = error.response?.data?.msg ||
                error.response?.data?.message ||
                'Error al reasignar doctor. Por favor intente nuevamente.';
            alert(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredDoctors = doctors.filter(doc => {
        // Corregido acceso a propiedades: DP_user en lugar de user, DP_specialties en lugar de specialties
        const fullName = `${doc.DP_user?.name || ''} ${doc.DP_user?.last_name || ''}`.toLowerCase();
        const specialty = doc.DP_specialties?.map(s => s.name).join(' ').toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        // Excluir el doctor actual de la lista
        if (doc.id === appointment.doctor_profile_id) return false;

        return fullName.includes(search) || specialty.includes(search);
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Reasignar Doctor</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Seleccione un nuevo doctor para la cita de {appointment.patient_name}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o especialidad..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Doctor List */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader className="w-8 h-8 animate-spin text-[#B490CA]" />
                        </div>
                    ) : filteredDoctors.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No se encontraron doctores disponibles
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {filteredDoctors.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => setSelectedDoctor(doc)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedDoctor?.id === doc.id
                                        ? 'border-[#B490CA] bg-[#F3E8FF] ring-1 ring-[#B490CA]'
                                        : 'border-gray-200 hover:border-[#B490CA] hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            <User className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                Dr. {doc.DP_user?.name} {doc.DP_user?.last_name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {doc.DP_specialties?.map(s => s.name).join(', ') || 'Sin especialidad'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleReassign}
                        disabled={!selectedDoctor || submitting}
                        className="px-4 py-2 bg-[#B490CA] text-white rounded-lg hover:bg-[#9f7ab5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {submitting && <Loader className="w-4 h-4 animate-spin" />}
                        Confirmar Reasignación
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReassignDoctorModal;
