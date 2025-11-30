import UserSessionDAO from '../../Datos/DAOs/UserSessionDAO.js';

const getActiveSessionsService = async (userId) => {
    const userSessionDAO = new UserSessionDAO();
    const sessions = await userSessionDAO.findActiveByUserId(userId);

    // Formatear sesiones para el frontend (ocultar token por seguridad)
    const formattedSessions = sessions.map(session => ({
        id: session.id,
        device_info: session.device_info || 'Unknown Device',
        ip_address: session.ip_address || 'Unknown IP',
        last_activity: session.last_activity,
        expires_at: session.expires_at,
        is_current: false
    }));

    return formattedSessions;
};

export default getActiveSessionsService;
