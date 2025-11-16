import BaseDAO from "./BaseDAO.js";
import Role from "../Models/Role.js";

class RoleDAO extends BaseDAO {
    constructor() {
        super(Role);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }



}

export default RoleDAO; 