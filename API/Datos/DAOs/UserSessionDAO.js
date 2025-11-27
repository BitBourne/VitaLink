import BaseDAO from "./BaseDAO.js";
import UserSession from "../Models/UserSession.js";
import { Op } from "sequelize";

class UserSessionDAO extends BaseDAO {
    constructor() {
        super(UserSession);
    }

    async createSession(sessionData) {
        return await this.create(sessionData);
    }

    async findActiveByUserId(userId) {
        return await this.model.findAll({
            where: {
                user_id: userId,
                is_active: true,
                expires_at: {
                    [Op.gt]: new Date(),
                },
            },
            order: [['last_activity', 'DESC']],
        });
    }

    async updateLastActivity(sessionId) {
        return await this.model.update(
            { last_activity: new Date() },
            { where: { id: sessionId } }
        );
    }

    async deactivateSession(sessionId) {
        return await this.model.update(
            { is_active: false },
            { where: { id: sessionId } }
        );
    }

    async deactivateAllUserSessions(userId) {
        return await this.model.update(
            { is_active: false },
            { where: { user_id: userId } }
        );
    }

    async cleanExpiredSessions() {
        return await this.model.update(
            { is_active: false },
            {
                where: {
                    expires_at: {
                        [Op.lt]: new Date(),
                    },
                    is_active: true,
                },
            }
        );
    }

    async findByToken(token) {
        return await this.model.findOne({
            where: { token, is_active: true },
        });
    }
}

export default UserSessionDAO;
