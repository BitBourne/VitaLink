import deleteSessionService from '../../../Negocio/authServices/deleteSessionService.js';

const deleteSession = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { sessionId } = req.params;

        const result = await deleteSessionService(parseInt(sessionId), userId);

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export default deleteSession;
