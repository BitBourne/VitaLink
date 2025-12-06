import ConversationDAO from '../../Datos/DAOs/Chats/ConversationDAO.js';
import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';

/**
 * Crear una conversación vinculada a una cita
 * @param {Object} conversationDTO - Objeto de datos de la conversación
 * @param {number} creatorUserId - ID del usuario que crea la conversación
 * @returns {Promise<Object>} Conversación creada
 */


const createConversationService = async (conversationDTO, creatorUserId) => {
    const { appointment_id, doctor_profile_id, patient_id } = conversationDTO;

    const conversationDAO = new ConversationDAO();
    const appointmentDAO = new AppointmentDAO();
    const userDAO = new UserDAO();
console.log("DTO recibido:", conversationDTO);
console.log("creatorUserId:", creatorUserId);

    // Validaciones
    if (!appointment_id || !doctor_profile_id || !patient_id) {
        const error = new Error('appointment_id, doctor_profile_id y patient_id son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    const appointment = await appointmentDAO.findById(appointment_id);
    if (!appointment) {
        const error = new Error('Appointment not found');
        error.statusCode = 404;
        throw error;
    }

    // Verificar que doctor y paciente correspondan a la cita
    if (appointment.doctor_profile_id !== doctor_profile_id && appointment.patient_id !== patient_id) {
        const error = new Error('Doctor o paciente no corresponden a la cita');
        error.statusCode = 400;
        throw error;
    }

    // Crear la conversación
    const newConversation = await conversationDAO.create({
        appointment_id,
        doctor_profile_id,
        patient_id,
        created_by: creatorUserId
    });

    return {newConversation, conversationId: newConversation.id };
};

export default createConversationService;
