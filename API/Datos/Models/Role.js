// Rol.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Roles = db.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { // mantenemos 'name'
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export default Roles;
