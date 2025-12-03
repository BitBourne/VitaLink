import MessageDAO from '../../Datos/DAOs/Chats/MessagesDAO.js';

const messageDAO = new MessageDAO();

export const getMessagesByConversationService = async (conversation_id) => {
  if (!conversation_id) {
    const error = new Error('conversation_id es obligatorio');
    error.statusCode = 400;
    throw error;
  }

  const messages = await messageDAO.getMessagesByConversation(conversation_id);
  return messages;
};
