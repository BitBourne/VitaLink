import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const UserSession = db.define("user_sessions", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    device_info: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ip_address: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    last_activity: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

export default UserSession;
