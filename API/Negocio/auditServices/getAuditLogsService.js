// getAuditLogsService.js
import AuditLogDAO from "../../Datos/DAOs/AuditLogDAO.js";

const getAuditLogsService = async (filters = {}) => {
    const auditLogDAO = new AuditLogDAO();

    try {
        const { userId, resourceType, offset = 0, limit = 50 } = filters;

        let logs;

        if (userId) {
            logs = await auditLogDAO.findByUserId(userId, limit);
        } else if (resourceType) {
            logs = await auditLogDAO.findByResourceType(resourceType, limit);
        } else {
            logs = await auditLogDAO.findAllWithPagination(offset, limit);
        }

        return logs;
    } catch (error) {
        console.error('Error in getAuditLogsService:', error);
        const serviceError = new Error('Error al obtener logs de auditoría');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default getAuditLogsService;
