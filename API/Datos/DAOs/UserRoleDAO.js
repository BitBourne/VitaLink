import BaseDAO from "./BaseDAO.js";
import UserRoles from "../Models/UserRoles.js";
import Role from "../Models/Role.js"

class UserRolesDAO extends BaseDAO {
    constructor() {
        super(UserRoles);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    


    async assignRole(userId, roleId){
        
        return await this.model.create({ user_id: userId, role_id: roleId })
        
        
    }

    async findAllRolesByID(userId){
        return await this.model.findAll({
        where: { user_id: userId },
        include: [{
            model: Role,      // importa el modelo de roles
            as: 'UR_role',       // usa el alias definido en la asociación
            attributes: ['id', 'name']
        }]
    })
    }

}

export default UserRolesDAO; 