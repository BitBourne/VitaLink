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
}

export default UserDAO; 