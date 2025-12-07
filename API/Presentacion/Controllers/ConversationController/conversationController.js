import createConversationService from '../../../Negocio/conversationServices/conversationService.js';

const createConversation = async (req, res, next) => {
    try {
        const userId = req.user.id; // usuario que crea la conversación
        const { appointment_id, doctor_profile_id, patient_id } = req.body;

        const conversationData = {
            appointment_id,
            doctor_profile_id,
            patient_id
        };

        const conversation = await createConversationService(conversationData, userId);

        res.status(201).json({
            success: true,
            message: 'Conversation created successfully',
            conversation
        });
    } catch (error) {
        next(error);
    }
};

export default createConversation;
