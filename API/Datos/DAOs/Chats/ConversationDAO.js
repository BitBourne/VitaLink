import BaseDAO from '../BaseDAO.js';
import Conversation from '../../Models/Chats/Conversations.js';

class ConversationDAO extends BaseDAO {
    constructor() {
        super(Conversation);
    }

    /**
     * Crear conversación
     * @param {Object} data - Datos de la conversación
     */
    async create(data) {
        const conversation = await super.create(data);
        return conversation;
    }

    /**
     * Buscar conversación por cita
     * @param {number} appointmentId
     * @returns {Promise<Object|null>}
     */
    async findByAppointmentId(appointmentId) {
        return await this.model.findOne({ where: { appointment_id: appointmentId } });
    }
}

export default ConversationDAO;
