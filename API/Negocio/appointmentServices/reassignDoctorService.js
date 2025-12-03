import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

/**
 * Servicio para reasignar un doctor a una cita existente
 * Verifica disponibilidad del nuevo doctor antes de reasignar
 */
const reassignDoctorService = async (appointmentId, newDoctorProfileId) => {
    const appointmentDAO = new AppointmentDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    // Obtener la cita actual
    const appointment = await appointmentDAO.findById(appointmentId);
    if (!appointment) {
        const error = new Error('Cita no encontrada');
        error.statusCode = 404;
        throw error;
    }

    // Verificar que la cita no esté cancelada o completada
    if (appointment.status === 'cancelled' || appointment.status === 'completed') {
        const error = new Error('No se puede reasignar una cita cancelada o completada');
        error.statusCode = 400;
        throw error;
    }

    // Verificar que el nuevo doctor existe
    const newDoctor = await doctorProfileDAO.findById(newDoctorProfileId);
    if (!newDoctor) {
        const error = new Error('Doctor no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Verificar que el doctor esté verificado
    if (newDoctor.verification_status !== 'approved') {
        const error = new Error('El doctor no está verificado');
        error.statusCode = 400;
        throw error;
    }

    // Verificar disponibilidad del nuevo doctor en la fecha/hora de la cita
    const isAvailable = await appointmentDAO.checkSlotAvailability(
        newDoctorProfileId,
        appointment.appointment_date,
        appointment.appointment_time
    );

    if (!isAvailable) {
        const error = new Error('El doctor no está disponible en esta fecha y hora');
        error.statusCode = 409;
        throw error;
    }

    // Actualizar la cita con el nuevo doctor
    const updatedAppointment = await appointmentDAO.update(appointmentId, {
        doctor_profile_id: newDoctorProfileId,
        status: 'pending' // Resetear a pendiente para que el nuevo doctor confirme
    });

    return updatedAppointment;
};

export default reassignDoctorService;
