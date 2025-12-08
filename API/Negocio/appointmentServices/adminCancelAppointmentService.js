import AppointmentDAO from "../../Datos/DAOs/AppointmentDAO.js";

/**
 * Servicio para cancelar una cita desde el panel de administración
 * @param {number} appointmentId - ID de la cita
 * @param {string} adminReason - Razón de la cancelación por parte del admin
 * @returns {Promise<Object>} Cita actualizada
 */
export const adminCancelAppointmentService = async (appointmentId, adminReason) => {
    const appointmentDAO = new AppointmentDAO();

    const appointment = await appointmentDAO.model.findByPk(appointmentId);

    if (!appointment) {
        throw new Error('Cita no encontrada');
    }

    if (appointment.status === 'cancelled') {
        throw new Error('La cita ya está cancelada');
    }

    if (appointment.status === 'completed') {
        throw new Error('No se puede cancelar una cita completada');
    }

    // Actualizar la cita
    await appointment.update({
        status: 'cancelled',
        cancellation_reason: adminReason || 'Cancelado por administración',
        cancelled_at: new Date()
    });

    return appointment;
};