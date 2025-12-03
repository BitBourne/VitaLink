import BaseDAO from "./BaseDAO.js";
import UserRoles from "../Models/UserRoles.js";
import Role from "../Models/Role.js"

class UserRolesDAO extends BaseDAO {
    constructor() {
        super(UserRoles);
    }

    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async assignRole(userId, roleId) {
        return await this.model.create({ user_id: userId, role_id: roleId })
    }

    async findAllRolesByID(userId) {
        return await this.model.findAll({
            where: { user_id: userId },
            include: [{
                model: Role,
                as: 'UR_role',
                attributes: ['id', 'name']
            }]
        })
    }

    async removeRole(userId, roleId) {
        return await this.model.destroy({
            where: {
                user_id: userId,
                role_id: roleId
            }
        });
    }
}

export default UserRolesDAO;