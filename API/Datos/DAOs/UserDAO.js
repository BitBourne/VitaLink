import BaseDAO from "./BaseDAO.js";
import User from "../Models/User.js";
import UserRolesDAO from "../DAOs/UserRoleDAO.js";
import UserPermissionDAO from "./UserPermissionDAO.js";

class UserDAO extends BaseDAO {
    constructor() {
        super(User);
        this.userRolesDAO = new UserRolesDAO();
        this.userPermissionDAO = new UserPermissionDAO();
    }

    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async getUserRoles(userId) {
        const userRoles = await this.userRolesDAO.findAllRolesByID(userId);
        return userRoles.map(ur => ur.UR_role);
    }

    async getPermissionsByUser(userId) {
        const userPermission = await this.userPermissionDAO.findAllPermissionsByID(userId);
        return userPermission.map(ur => ur.UP_permission);
    }

    async setToken(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error(`${this.model.name} with ID ${id} not found`);
        return await instance.update(data);
    }
}

export default UserDAO;