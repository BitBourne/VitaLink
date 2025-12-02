import DoctorAvailabilityDAO from "../../Datos/DAOs/DoctorAvailabilityDAO.js";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";

const setAvailabilityService = async (availabilityDTO) => {
    const { doctor_profile_id, day_of_week, start_time, end_time, is_available = true } = availabilityDTO;

    const availabilityDAO = new DoctorAvailabilityDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    if (doctor_profile_id === undefined || day_of_week === undefined || !start_time || !end_time) {
        const error = new Error('Faltan campos obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (day_of_week < 0 || day_of_week > 6) {
        const error = new Error('El día de la semana debe estar entre 0 (Domingo) y 6 (Sábado)');
        error.statusCode = 400;
        throw error;
    }

    if (start_time >= end_time) {
        const error = new Error('La hora de inicio debe ser menor que la hora de fin');
        error.statusCode = 400;
        throw error;
    }

    try {
        const doctorProfile = await doctorProfileDAO.findById(doctor_profile_id);
        if (!doctorProfile) {
            const error = new Error('El perfil del doctor no existe');
            error.statusCode = 404;
            throw error;
        }

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
