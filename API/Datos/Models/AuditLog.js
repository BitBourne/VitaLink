import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const AuditLog = db.define("audit_logs", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  resource_type: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resource_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  ip_address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  user_agent: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  details: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

export default AuditLog;
