import getActiveSessionsService from '../../../Negocio/authServices/getActiveSessionsService.js';

const getActiveSessions = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const sessions = await getActiveSessionsService(userId);

        res.json({
            success: true,
            sessions
        });
    } catch (error) {
        next(error);
    }
};

export default getActiveSessions;
