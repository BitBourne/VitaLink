import express from "express";
import { getMessagesByConversation } from "../Controllers/MessageController/messageController.js";
import { checkAuth } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();


router.get('/conversations/:conversationId/messages', checkAuth, getMessagesByConversation);

export default router;
