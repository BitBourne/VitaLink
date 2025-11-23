// UserSessionDAO.js
import BaseDAO from "./BaseDAO.js";
import UserSession from "../Models/UserSession.js";
import { Op } from "sequelize";

class UserSessionDAO extends BaseDAO {
    constructor() {
        super(UserSession);
    }

    // Crear nueva sesión
    async createSession(sessionData) {
        return await this.create(sessionData);
    }

    // Obtener sesiones activas de un usuario
    async findActiveByUserId(userId) {
        return await this.model.findAll({
            where: {
                user_id: userId,
                is_active: true,
                expires_at: {
                    [Op.gt]: new Date(), // Mayor que la fecha actual
                },
            },
            order: [['last_activity', 'DESC']],
        });
    }

    // Actualizar última actividad
    async updateLastActivity(sessionId) {
        return await this.model.update(
            { last_activity: new Date() },
            { where: { id: sessionId } }
        );
    }

    // Desactivar sesión
    async deactivateSession(sessionId) {
        return await this.model.update(
            { is_active: false },
            { where: { id: sessionId } }
        );
    }

    // Desactivar todas las sesiones de un usuario
    async deactivateAllUserSessions(userId) {
        return await this.model.update(
            { is_active: false },
            { where: { user_id: userId } }
        );
    }

    // Limpiar sesiones expiradas
    async cleanExpiredSessions() {
        return await this.model.update(
            { is_active: false },
            {
                where: {
                    expires_at: {
                        [Op.lt]: new Date(), // Menor que la fecha actual
                    },
                    is_active: true,
                },
            }
        );
    }

    // Buscar sesión por token
    async findByToken(token) {
        return await this.model.findOne({
            where: { token, is_active: true },
        });
    }
}

export default UserSessionDAO;
