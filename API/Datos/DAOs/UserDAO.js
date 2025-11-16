import BaseDAO from "./BaseDAO.js";
import User from "../Models/User.js";
import UserRolesDAO from "../DAOs/UserRoleDAO.js";
import Permission from "../Models/Permission.js";


class UserDAO extends BaseDAO {
    constructor() {
        super(User);
        this.userRolesDAO = new UserRolesDAO();
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

    // Obtener todos los permisos del usuario
    async getUserRoles(userId) {
        const userRoles = await this.userRolesDAO.findAllRolesByID(userId);
        
        // Formateamos la salida para devolver solo los datos del rol
        return userRoles.map(ur => ur.UR_role);
    }


    // Obtener los permisos de una lista de roles
    async getPermissionsByUsers(userId) {
        const permissions = await User.findAll({
            where: { id: userId },
            include: {
                model: Permission,
                as: 'U_permissions',
                attributes: ['id', 'name']
            }
        });

        // devuelve array con los permisos del usuario
        return permissions.flatMap(p => p.name);
    }

}

export default UserDAO; 