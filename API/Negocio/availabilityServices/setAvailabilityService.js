// setAvailabilityService.js
import DoctorAvailabilityDAO from "../../Datos/DAOs/DoctorAvailabilityDAO.js";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";

const setAvailabilityService = async (availabilityDTO) => {
    const { doctor_profile_id, day_of_week, start_time, end_time, is_available = true } = availabilityDTO;

    const availabilityDAO = new DoctorAvailabilityDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    // Validar campos obligatorios
    if (doctor_profile_id === undefined || day_of_week === undefined || !start_time || !end_time) {
        const error = new Error('Faltan campos obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validar día de la semana
    if (day_of_week < 0 || day_of_week > 6) {
        const error = new Error('El día de la semana debe estar entre 0 (Domingo) y 6 (Sábado)');
        error.statusCode = 400;
        throw error;
    }

    // Validar que start_time sea menor que end_time
    if (start_time >= end_time) {
        const error = new Error('La hora de inicio debe ser menor que la hora de fin');
        error.statusCode = 400;
        throw error;
    }

    try {
        // Verificar que el perfil del doctor existe
        const doctorProfile = await doctorProfileDAO.findById(doctor_profile_id);
        if (!doctorProfile) {
            const error = new Error('El perfil del doctor no existe');
            error.statusCode = 404;
            throw error;
        }

        // Crear la disponibilidad
        const availability = await availabilityDAO.createAvailability({
            doctor_profile_id,
            day_of_week,
            start_time,
            end_time,
            is_available,
        });

        return {
            message: 'Disponibilidad configurada exitosamente',
            availability,
        };
    } catch (error) {
        if (error.statusCode) throw error;

        console.error('Error in setAvailabilityService:', error);
        const serviceError = new Error('Error al configurar la disponibilidad');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default setAvailabilityService;
