import BaseDAO from "./BaseDAO.js";
import User from "../Models/User.js";

class UserDAO extends BaseDAO {
    constructor() {
        super(User);
    }

    // Custom methods
}

export default UserDAO; 