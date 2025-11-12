import BaseDAO from "./BaseDAO.js";
import User from "../Models/User.js";
import UserRolesDAO from "../DAOs/UserRoleDAO.js";

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

}

export default UserDAO; 