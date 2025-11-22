import BaseDAO from "./BaseDAO.js";
import Permission from "../Models/Permission.js";
import UserPermission from "../Models/UserPermission.js";

class UserPermissionDAO extends BaseDAO {
    constructor() {
        super(UserPermission);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async assignPermission(userId, permissionId){
        return await this.model.create({ user_id: userId, permission_id: permissionId })
    }

    async findAllPermissionsByID(userId){
        return await this.model.findAll({
        where: { user_id: userId },
        include: [{
            model: Permission,      // importa el modelo de permisos
            as: 'UP_permission',       // usa el alias definido en la asociación
            attributes: ['id', 'name']
        }]
    })
    }


}

export default UserPermissionDAO; 