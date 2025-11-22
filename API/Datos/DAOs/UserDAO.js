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

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    // Obtener todos los roles del usuario
    async getUserRoles(userId) {
        const userRoles = await this.userRolesDAO.findAllRolesByID(userId);
        
        // Formateamos la salida para devolver solo los datos del rol
        return userRoles.map(ur => ur.UR_role);
    }

    

    // Obtener los permisos de una lista de roles
    async getPermissionsByUser(userId) {
        const userPermission = await this.userPermissionDAO.findAllPermissionsByID(userId);
        
        // Formateamos la salida para devolver solo los datos del rol
        return userPermission.map(ur => ur.UP_permission);
    }


    async setToken(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error(`${this.model.name} with ID ${id} not found`);
        return await instance.update(data);
    }
}

export default UserDAO; 