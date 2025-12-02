import { getMessagesByConversationService } from '../../../Negocio/messageServices/messageService.js';

export const getMessagesByConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const messages = await getMessagesByConversationService(conversationId);

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};