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
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // account verification status
    verified: {
    type: Sequelize.BOOLEAN,
        defaultValue: false // By default, a new user is not verified
    }, 
    // New field for the verification code or token
    token: {
        type: Sequelize.STRING,
        allowNull: true // It must be null after verification
    }
});

export default User;