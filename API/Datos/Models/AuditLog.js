// AuditLog.js
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
    allowNull: true, // Puede ser null para acciones sin autenticación
  },
  action: {
    type: Sequelize.STRING,
    allowNull: false,
    // Ejemplos: 'login', 'view_profile', 'create_appointment', 'update_doctor_profile'
  },
  resource_type: {
    type: Sequelize.STRING,
    allowNull: true,
    // Ejemplos: 'User', 'DoctorProfile', 'Appointment'
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
    // JSON string con información adicional
  },
});

export default AuditLog;
