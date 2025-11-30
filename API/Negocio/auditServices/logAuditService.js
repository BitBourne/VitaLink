import AuditLogDAO from "../../Datos/DAOs/AuditLogDAO.js";

/**
 * Servicio centralizado para crear logs de auditoría
 * @param {Object} auditData - Datos del log
 * @param {number} auditData.user_id - ID del usuario (opcional)
 * @param {string} auditData.action - Acción realizada
 * @param {string} auditData.resource_type - Tipo de recurso (opcional)
 * @param {number} auditData.resource_id - ID del recurso (opcional)
 * @param {string} auditData.ip_address - IP del usuario (opcional)
 * @param {string} auditData.user_agent - User agent (opcional)
 * @param {Object} auditData.details - Detalles adicionales (opcional)
 */
const logAuditService = async (auditData) => {
    try {
        const auditLogDAO = new AuditLogDAO();

        const logData = {
            user_id: auditData.user_id || null,
            action: auditData.action,
            resource_type: auditData.resource_type || null,
            resource_id: auditData.resource_id || null,
            ip_address: auditData.ip_address || null,
            user_agent: auditData.user_agent || null,
            details: auditData.details ? JSON.stringify(auditData.details) : null,
        };

        await auditLogDAO.createLog(logData);
    } catch (error) {
        // Non-blocking error handling for audit logging
        console.error('Error creating audit log:', error);
    }
};

export default logAuditService;
