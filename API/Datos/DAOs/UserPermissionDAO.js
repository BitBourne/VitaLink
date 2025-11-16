import BaseDAO from "./BaseDAO.js";
import UserPermission from "../Models/UserPermission.js";

class UserPermissionDAO extends BaseDAO {
    constructor() {
        super(UserPermission);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async assignPermission(roleId, permissionId){
        return await this.model.create({ role_id: roleId, permission_id: permissionId })
    }
}

export default UserPermissionDAO; 