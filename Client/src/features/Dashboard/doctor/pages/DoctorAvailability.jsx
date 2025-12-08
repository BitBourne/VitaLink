import React, { useEffect, useState } from 'react';
import { Clock, Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';
import availabilityService from '../../../../core/api/services/availabilityService';
import apiClient from '../../../../core/api/apiClient';
import useAuth from '../../../auth/hooks/useAuth';

const DAYS_OF_WEEK = [
    { value: 0, label: 'Domingo' },
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' }
];

const DoctorAvailability = () => {
    const { user } = useAuth();
    const [availability, setAvailability] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        day_of_week: '',
        start_time: '',
        end_time: '',
        is_available: true
    });

    // Fetch availability on mount
    useEffect(() => {
        fetchAvailability();
    }, []);

    const fetchAvailability = async () => {
        try {
            setLoading(true);
            setError(null);

            // Get the doctor profile ID using the user's ID
            // We'll call the auth profile to ensure we have the user ID
            if (!user?.id) {
                setError('Usuario no autenticado');
                return;
            }

            // Fetch the doctor profile using a custom endpoint or direct query
            // Since there's no /doctor/profile endpoint, we'll use the doctors list endpoint
            // and filter by the current user
            const doctorsResponse = await apiClient.get('/doctor');
            const doctors = doctorsResponse.data.doctors || doctorsResponse.data;

            // Find the doctor profile that matches the current user
            const doctorProfile = doctors.find(doc => doc.user_id === user.id);

            if (!doctorProfile) {
                setError('No se encontró el perfil de doctor');
                return;
            }

            const doctorProfileId = doctorProfile.id;

            const response = await availabilityService.getAvailability(doctorProfileId);
            setAvailability(response.availability || []);
        } catch (err) {
            console.error('Error fetching availability:', err);
            setError(err.response?.data?.message || err.message || 'Error al cargar disponibilidad');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validations
        if (!formData.day_of_week && formData.day_of_week !== 0) {
            setError('Selecciona un día de la semana');
            return;
        }

        if (!formData.start_time || !formData.end_time) {
            setError('Ingresa hora de inicio y fin');
            return;
        }

        if (formData.start_time >= formData.end_time) {
            setError('La hora de inicio debe ser menor que la hora de fin');
            return;
        }

        try {
            await availabilityService.setAvailability({
                day_of_week: parseInt(formData.day_of_week),
                start_time: formData.start_time,
                end_time: formData.end_time,
                is_available: formData.is_available
            });

            setSuccess('Disponibilidad agregada exitosamente');
            setFormData({
                day_of_week: '',
                start_time: '',
                end_time: '',
                is_available: true
            });

            // Refresh availability list
            await fetchAvailability();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error creating availability:', err);
            setError(err.response?.data?.message || 'Error al crear disponibilidad');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este bloque de disponibilidad?')) {
            return;
        }

        try {
            setError(null);
            await availabilityService.deleteAvailability(id);
            setSuccess('Disponibilidad eliminada exitosamente');

            // Refresh availability list
            await fetchAvailability();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error deleting availability:', err);
            setError(err.response?.data?.message || 'Error al eliminar disponibilidad');
        }
    };

    // Group availability by day
    const groupedAvailability = DAYS_OF_WEEK.map(day => ({
        ...day,
        slots: availability.filter(slot => slot.day_of_week === day.value)
    }));

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Cargando disponibilidad...</div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Clock className="text-[#B490CA]" size={32} />
                    Gestión de Disponibilidad
                </h1>
                <p className="text-gray-500 mt-1">Configura tus horarios de atención semanales</p>
            </header>

            {/* Alert Messages */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
                    <Calendar size={20} />
                    <span>{success}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                            <Plus className="text-[#5EE7DF]" size={20} />
                            Agregar Disponibilidad
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Day of Week */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Día de la Semana
                                </label>
                                <select
                                    name="day_of_week"
                                    value={formData.day_of_week}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    required
                                >
                                    <option value="">Selecciona un día</option>
                                    {DAYS_OF_WEEK.map(day => (
                                        <option key={day.value} value={day.value}>
                                            {day.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Start Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Inicio
                                </label>
                                <input
                                    type="time"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* End Time */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hora de Fin
                                </label>
                                <input
                                    type="time"
                                    name="end_time"
                                    value={formData.end_time}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Is Available Toggle */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="is_available"
                                    id="is_available"
                                    checked={formData.is_available}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#B490CA] border-gray-300 rounded focus:ring-[#B490CA]"
                                />
                                <label htmlFor="is_available" className="text-sm font-medium text-gray-700">
                                    Disponible para citas
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-main-gradient text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                Agregar Horario
                            </button>
                        </form>
                    </div>
                </div>

                {/* Calendar View Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-800">
                            <Calendar className="text-[#5EE7DF]" size={20} />
                            Horarios Configurados
                        </h2>

                        <div className="space-y-4">
                            {groupedAvailability.map(day => (
                                <div key={day.value} className="border border-gray-100 rounded-xl overflow-hidden">
                                    {/* Day Header */}
                                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                                        <h3 className="font-bold text-gray-800">{day.label}</h3>
                                    </div>

                                    {/* Slots */}
                                    <div className="p-4">
                                        {day.slots.length > 0 ? (
                                            <div className="space-y-2">
                                                {day.slots.map(slot => (
                                                    <div
                                                        key={slot.id}
                                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Clock size={16} className="text-[#B490CA]" />
                                                            <span className="font-medium text-gray-800">
                                                                {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                                                            </span>
                                                            {slot.is_available ? (
                                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                                                    Disponible
                                                                </span>
                                                            ) : (
                                                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                                                                    No disponible
                                                                </span>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => handleDelete(slot.id)}
                                                            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 text-gray-400 text-sm">
                                                No hay horarios configurados para este día
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorAvailability;
