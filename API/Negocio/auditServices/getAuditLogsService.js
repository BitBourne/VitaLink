import AuditLogDAO from "../../Datos/DAOs/AuditLogDAO.js";

const getAuditLogsService = async (filters = {}) => {
    const auditLogDAO = new AuditLogDAO();

    try {
        const { userId, user, action, dateFrom, dateTo, ip, offset = 0, limit = 50 } = filters;

        // Use the new findWithFilters method for all queries
        const result = await auditLogDAO.findWithFilters({
            userId,
            user,
            action,
            dateFrom,
            dateTo,
            ip,
            offset,
            limit
        });

        // Format the response
        return {
            total: result.count,
            logs: result.rows.map(log => {
                const logJSON = log.toJSON();
                // Flatten user info for easier consumption if needed, or keep nested
                return {
                    ...logJSON,
                    user: logJSON.AL_user ? `${logJSON.AL_user.name} ${logJSON.AL_user.last_name}` : 'Sistema/Desconocido',
                    userEmail: logJSON.AL_user?.email
                };
            })
        };
    } catch (error) {
        console.error('Error in getAuditLogsService:', error);
        const serviceError = new Error('Error al obtener logs de auditoría');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default getAuditLogsService;