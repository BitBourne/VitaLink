import BaseDAO from "./BaseDAO.js";
import Permission from "../Models/Permission.js";

class PermissionDAO extends BaseDAO {
    constructor() {
        super(Permission);
    }

    async findOne(data) {
        return await this.model.findOne({ where: data });
    }
}

export default PermissionDAO;