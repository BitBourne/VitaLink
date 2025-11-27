import DoctorAvailabilityDAO from "../../Datos/DAOs/DoctorAvailabilityDAO.js";

const deleteAvailabilityService = async (availabilityId, doctorProfileId) => {
    const availabilityDAO = new DoctorAvailabilityDAO();

    try {
        if (!availabilityId) {
            const error = new Error('ID de disponibilidad es requerido');
            error.statusCode = 400;
            throw error;
        }

        const availability = await availabilityDAO.findById(availabilityId);

        if (!availability) {
            const error = new Error('Disponibilidad no encontrada');
            error.statusCode = 404;
            throw error;
        }

        if (availability.doctor_profile_id !== doctorProfileId) {
            const error = new Error('No tienes permiso para eliminar esta disponibilidad');
            error.statusCode = 403;
            throw error;
        }

        await availabilityDAO.deleteAvailability(availabilityId);

        return {
            message: 'Disponibilidad eliminada exitosamente',
        };
    } catch (error) {
        if (error.statusCode) throw error;

        console.error('Error in deleteAvailabilityService:', error);
        const serviceError = new Error('Error al eliminar la disponibilidad');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default deleteAvailabilityService;
