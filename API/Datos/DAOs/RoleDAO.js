import BaseDAO from "./BaseDAO.js";
import Role from "../Models/Role.js";
import Permission from "../Models/Permission.js"

class RoleDAO extends BaseDAO {
    constructor() {
        super(Role);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    // Obtener los permisos de una lista de roles
    async getPermissionsByRoles(roleIds) {
        const roles = await Role.findAll({
            where: { id: roleIds },
            include: {
                model: Permission,
                as: 'permission_id',
                attributes: ['id', 'name']
            }
        });

        // aplanamos los permisos de todos los roles
        return roles.flatMap(role => role.permissions);
    }


}

export default RoleDAO; 