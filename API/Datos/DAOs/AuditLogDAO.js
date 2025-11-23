// AuditLogDAO.js
import BaseDAO from "./BaseDAO.js";
import AuditLog from "../Models/AuditLog.js";

class AuditLogDAO extends BaseDAO {
    constructor() {
        super(AuditLog);
    }

    // Crear un log de auditoría
    async createLog(auditData) {
        return await this.create(auditData);
    }

    // Obtener logs por usuario
    async findByUserId(userId, limit = 50) {
        return await this.model.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']],
            limit,
        });
    }

    // Obtener logs por tipo de recurso
    async findByResourceType(resourceType, limit = 50) {
        return await this.model.findAll({
            where: { resource_type: resourceType },
            order: [['createdAt', 'DESC']],
            limit,
        });
    }

    // Obtener todos los logs con paginación
    async findAllWithPagination(offset = 0, limit = 50) {
        return await this.model.findAll({
            order: [['createdAt', 'DESC']],
            offset,
            limit,
        });
    }
}

export default AuditLogDAO;
