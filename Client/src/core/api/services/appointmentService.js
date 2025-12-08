import apiClient from '../apiClient.jsx';

/**
 * Servicio para gestionar citas médicas
 */
const appointmentService = {
    /**
     * Obtener todas las citas del usuario autenticado
     * - Si es doctor: obtiene sus citas como doctor
     * - Si es paciente: obtiene sus citas como paciente
     * - Si es admin: obtiene todas las citas
     * 
     * @param {Object} filters - Filtros opcionales
     * @param {string} filters.status - Estado de la cita (pending, confirmed, completed, cancelled)
     * @param {string} filters.date - Fecha en formato YYYY-MM-DD
     * @returns {Promise<Array>} Lista de citas
     */
    getAppointments: async (filters = {}) => {
        try {
            // Construir query params
            const params = new URLSearchParams();
            if (filters.status) params.append('status', filters.status);
            if (filters.date) params.append('date', filters.date);

            const queryString = params.toString();
            const url = queryString ? `/appointments?${queryString}` : '/appointments';

            const response = await apiClient.get(url);
            return response.data;
        } catch (error) {
            console.error('Error al obtener citas:', error);
            throw error;
        }
    },

    /**
     * Obtener detalles de una cita específica
     * @param {number} appointmentId - ID de la cita
     * @returns {Promise<Object>} Detalles de la cita
     */
    getAppointmentDetails: async (appointmentId) => {
        try {
            const response = await apiClient.get(`/appointments/${appointmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener detalles de la cita:', error);
            throw error;
        }
    },

    /**
     * Crear una nueva cita
     * @param {Object} appointmentData - Datos de la cita
     * @param {number} appointmentData.doctor_profile_id - ID del perfil del doctor
     * @param {string} appointmentData.appointment_date - Fecha en formato YYYY-MM-DD
     * @param {string} appointmentData.appointment_time - Hora en formato HH:MM
     * @param {string} appointmentData.reason - Motivo de la cita
     * @param {number} appointmentData.clinic_id - (Opcional) ID de la clínica
     * @returns {Promise<Object>} Cita creada
     */
    createAppointment: async (appointmentData) => {
        try {
            const response = await apiClient.post('/appointments', appointmentData);
            return response.data;
        } catch (error) {
            console.error('Error al crear cita:', error);
            throw error;
        }
    },

    /**
     * Confirmar una cita (solo doctores)
     * @param {number} appointmentId - ID de la cita
     * @returns {Promise<Object>} Cita confirmada
     */
    confirmAppointment: async (appointmentId) => {
        try {
            const response = await apiClient.put(`/appointments/${appointmentId}/confirm`);
            return response.data;
        } catch (error) {
            console.error('Error al confirmar cita:', error);
            throw error;
        }
    },

    /**
     * Cancelar una cita
     * @param {number} appointmentId - ID de la cita
     * @returns {Promise<Object>} Cita cancelada
     */
    cancelAppointment: async (appointmentId) => {
        try {
            const response = await apiClient.put(`/appointments/${appointmentId}/cancel`);
            return response.data;
        } catch (error) {
            console.error('Error al cancelar cita:', error);
            throw error;
        }
    },

    /**
     * Completar una cita (solo doctores)
     * @param {number} appointmentId - ID de la cita
     * @returns {Promise<Object>} Cita completada
     */
    completeAppointment: async (appointmentId) => {
        try {
            const response = await apiClient.put(`/appointments/${appointmentId}/complete`);
            return response.data;
        } catch (error) {
            console.error('Error al completar cita:', error);
            throw error;
        }
    }
};

export default appointmentService;
