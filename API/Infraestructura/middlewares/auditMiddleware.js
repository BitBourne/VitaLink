import logAuditService from "../../Negocio/auditServices/logAuditService.js";
import logger from "../utils/logger.js";

/**
 * Middleware para registrar automáticamente acciones en el sistema de auditoría
 * @param {string} action - Nombre de la acción a registrar
 * @param {string} resourceType - Tipo de recurso (opcional)
 * @returns {Function} Función middleware
 * 
 * Uso:
 * router.post('/endpoint', checkAuth, auditAction('create_appointment', 'Appointment'), controller)
 */
const auditAction = (action, resourceType = null) => {
    return async (req, res, next) => {
        // Guarda la función original de res.json
        const originalJson = res.json.bind(res);

        // Sobrescribe res.json para capturar la respuesta
        res.json = function (data) {
            // Registra la acción en auditoría
            logAuditService({
                user_id: req.user?.id || null,
                action,
                resource_type: resourceType,
                resource_id: data?.id || data?.result?.id || null,
                ip_address: req.ip || req.connection.remoteAddress,
                user_agent: req.get('user-agent'),
                details: {
                    method: req.method,
                    path: req.path,
                    statusCode: res.statusCode,
                },
            }).catch(err => {
                logger.error('Error in audit middleware:', err);
            });

            // Llama a la función original
            return originalJson(data);
        };

        next();
    };
};

export default auditAction;
