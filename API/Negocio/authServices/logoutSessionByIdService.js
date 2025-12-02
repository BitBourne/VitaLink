import UserSessionDAO from '../../Datos/DAOs/UserSessionDAO.js';

/**
 * Servicio para cerrar una sesión específica por ID
 * El usuario solo puede cerrar sus propias sesiones
 * @param {number} sessionId - ID de la sesión a cerrar
 * @param {number} userId - ID del usuario autenticado
 * @returns {object} Mensaje de éxito
 */
const logoutSessionByIdService = async (sessionId, userId) => {
    try {
        const userSessionDAO = new UserSessionDAO();
        const session = await userSessionDAO.findById(sessionId);

        if (!session) {
            const error = new Error('Sesión no encontrada.');
            error.statusCode = 404;
            throw error;
        }

        if (session.user_id !== userId) {
            const error = new Error('No tienes permiso para cerrar esta sesión.');
            error.statusCode = 403;
            throw error;
        }

        await userSessionDAO.delete(sessionId);

        return {
            success: true,
            message: 'Sesión cerrada exitosamente'
        };

    } catch (error) {
        console.error('Error in logoutSessionByIdService:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al cerrar la sesión.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default logoutSessionByIdService;
