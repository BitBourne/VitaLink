// getAvailabilityService.js
import DoctorAvailabilityDAO from "../../Datos/DAOs/DoctorAvailabilityDAO.js";

const getAvailabilityService = async (doctorProfileId, dayOfWeek = null) => {
    const availabilityDAO = new DoctorAvailabilityDAO();

    try {
        if (!doctorProfileId) {
            const error = new Error('ID del perfil del doctor es requerido');
            error.statusCode = 400;
            throw error;
        }

        let availability;

        if (dayOfWeek !== null) {
            // Obtener disponibilidad de un día específico
            availability = await availabilityDAO.findByDoctorAndDay(doctorProfileId, dayOfWeek);
        } else {
            // Obtener toda la disponibilidad del doctor
            availability = await availabilityDAO.findByDoctorId(doctorProfileId);
        }

        return availability;
    } catch (error) {
        if (error.statusCode) throw error;

        console.error('Error in getAvailabilityService:', error);
        const serviceError = new Error('Error al obtener la disponibilidad');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default getAvailabilityService;
