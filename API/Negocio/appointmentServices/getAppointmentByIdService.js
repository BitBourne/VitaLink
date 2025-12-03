import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import ConversationDAO from '../../Datos/DAOs/Chats/ConversationDAO.js';

const getAppointmentByIdService = async (appointmentId) => {
    const appointmentDAO = new AppointmentDAO();
    const conversationDAO = new ConversationDAO();

    // Obtener cita
    const appointment = await appointmentDAO.findById(appointmentId);
    if (!appointment) {
        const error = new Error("Cita no encontrada");
        error.statusCode = 404;
        throw error;
    }

    // Obtener conversación asociada (si existe)
    const conversation = await conversationDAO.findByAppointmentId(appointmentId);

    // Retornar cita con conversationId
    return {
        ...appointment.toJSON(),
        conversationId: conversation ? conversation.id : null
    };
};

export default getAppointmentByIdService;
