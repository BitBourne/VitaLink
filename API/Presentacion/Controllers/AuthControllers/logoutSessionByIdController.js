import logoutSessionByIdService from '../../../Negocio/authServices/logoutSessionByIdService.js';

const logoutSessionByIdController = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;

        const result = await logoutSessionByIdService(parseInt(sessionId), userId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default logoutSessionByIdController;
