import BaseDAO from "./BaseDAO.js";
import { AuditLog, User } from "../Models/Relations.js";
import { Op } from "sequelize";

class AuditLogDAO extends BaseDAO {
    constructor() {
        super(AuditLog);
    }

    async createLog(auditData) {
        return await this.create(auditData);
    }

    async findWithFilters(filters = {}) {
        const {
            userId,
            user, // Search term for user name/email
            action,
            dateFrom,
            dateTo,
            ip,
            offset = 0,
            limit = 50
        } = filters;

        const where = {};
        const userWhere = {};

        if (userId) {
            where.user_id = userId;
        }

        if (action && action !== 'all') {
            where.action = { [Op.like]: `%${action}%` };
        }

        if (ip) {
            where.ip_address = { [Op.like]: `%${ip}%` };
        }

        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) {
                where.createdAt[Op.gte] = new Date(dateFrom);
            }
            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                where.createdAt[Op.lte] = endDate;
            }
        }

        if (user) {
            userWhere[Op.or] = [
                { name: { [Op.like]: `%${user}%` } },
                { last_name: { [Op.like]: `%${user}%` } },
                { email: { [Op.like]: `%${user}%` } }
            ];
        }

        return await this.model.findAndCountAll({
            where,
            include: [{
                model: User,
                as: 'AL_user',
                attributes: ['id', 'name', 'last_name', 'email'],
                where: user ? userWhere : undefined,
                required: !!user // Only required if filtering by user
            }],
            order: [['id', 'DESC']],
            offset,
            limit,
        });
    }

    async findByUserId(userId, limit = 50) {
        return await this.model.findAll({
            where: { user_id: userId },
            order: [['id', 'DESC']],
            limit,
        });
    }

    async findByResourceType(resourceType, limit = 50) {
        return await this.model.findAll({
            where: { resource_type: resourceType },
            order: [['id', 'DESC']],
            limit,
        });
    }

    async findAllWithPagination(offset = 0, limit = 50) {
        return await this.model.findAndCountAll({
            include: [{
                model: User,
                as: 'AL_user',
                attributes: ['id', 'name', 'last_name', 'email']
            }],
            order: [['id', 'DESC']],
            offset,
            limit,
        });
    }
}

export default AuditLogDAO;
