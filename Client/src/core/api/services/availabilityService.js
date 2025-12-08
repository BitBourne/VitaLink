import apiClient from '../apiClient.jsx';

/**
 * Servicio para gestionar la disponibilidad de doctores
 */
const availabilityService = {
    /**
     * Obtener la disponibilidad de un doctor
     * @param {number} doctorId - ID del perfil del doctor
     * @param {number} dayOfWeek - (Opcional) Día de la semana (0-6)
     * @returns {Promise<Object>} Disponibilidad del doctor
     */
    getAvailability: async (doctorId, dayOfWeek = null) => {
        try {
            const params = new URLSearchParams();
            if (dayOfWeek !== null) {
                params.append('dayOfWeek', dayOfWeek);
            }

            const queryString = params.toString();
            const url = queryString
                ? `/availability/${doctorId}?${queryString}`
                : `/availability/${doctorId}`;

            const response = await apiClient.get(url);
            return response.data;
        } catch (error) {
            console.error('Error al obtener disponibilidad:', error);
            throw error;
        }
    },

    /**
     * Crear un nuevo bloque de disponibilidad
     * @param {Object} availabilityData - Datos de disponibilidad
     * @param {number} availabilityData.day_of_week - Día de la semana (0-6)
     * @param {string} availabilityData.start_time - Hora de inicio (HH:MM)
     * @param {string} availabilityData.end_time - Hora de fin (HH:MM)
     * @param {boolean} availabilityData.is_available - Disponible o no
     * @returns {Promise<Object>} Disponibilidad creada
     */
    setAvailability: async (availabilityData) => {
        try {
            const response = await apiClient.post('/availability', availabilityData);
            return response.data;
        } catch (error) {
            console.error('Error al crear disponibilidad:', error);
            throw error;
        }
    },

    /**
     * Eliminar un bloque de disponibilidad
     * @param {number} id - ID del bloque de disponibilidad
     * @returns {Promise<Object>} Resultado de la eliminación
     */
    deleteAvailability: async (id) => {
        try {
            const response = await apiClient.delete(`/availability/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar disponibilidad:', error);
            throw error;
        }
    }
};

export default availabilityService;
