import UserSessionDAO from '../../Datos/DAOs/UserSessionDAO.js';

const deleteSessionService = async (sessionId, userId) => {
    const userSessionDAO = new UserSessionDAO();

    const session = await userSessionDAO.findById(sessionId);

    if (!session) {
        const error = new Error('Sesión no encontrada');
        error.statusCode = 404;
        throw error;
    }

    if (session.user_id !== userId) {
        const error = new Error('No tienes permisos para eliminar esta sesión');
        error.statusCode = 403;
        throw error;
    }

    await userSessionDAO.deactivateSession(sessionId);

    return { success: true, message: 'Sesión cerrada exitosamente' };
};

export default deleteSessionService;
