// MessageDAO.js
import Message from '../../Models/Chats/Messages.js';
import BaseDAO from '../BaseDAO.js';



class MessageDAO extends BaseDAO {
  constructor() {
    super(Message); 
  }
    async createMessage(conversation_id, sender_id, receiver_id, message) {
        return await Message.create({
            conversation_id,
            sender_id,
            receiver_id,
            message
        });
    }
  async getMessagesByConversation(conversation_id) {
    return await this.model.findAll({
      where: { conversation_id },
      order: [['sent_at', 'ASC']],
    });
  }
}

export default MessageDAO;
