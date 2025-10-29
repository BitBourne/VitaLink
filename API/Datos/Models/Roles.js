import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Roles = db.define('roles', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Roles;