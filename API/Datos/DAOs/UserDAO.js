import BaseDAO from "./BaseDAO.js";
import User from "../Models/User.js";

class UserDAO extends BaseDAO {
    constructor() {
        super(User);
    }

    // Custom methods
    async findOne(data) {
        return await this.model.findOne({ where: data });
    }

    async setToken(id, data) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error(`${this.model.name} with ID ${id} not found`);
        return await instance.update(data);
    }
}

export default UserDAO; 