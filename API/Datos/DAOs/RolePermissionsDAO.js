import BaseDAO from "./BaseDAO.js";
import RolePermission from "../Models/RolePermission.js";

class RolePermissionDAO extends BaseDAO {
    constructor() {
        super(RolePermission);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async assignPermission(roleId, permissionId){
        return await this.model.create({ role_id: roleId, permission_id: permissionId })
    }
}

export default RolePermissionDAO; 