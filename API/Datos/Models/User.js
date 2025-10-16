import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const User = db.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default User;