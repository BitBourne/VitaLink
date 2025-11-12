// Permission.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Permission = db.define("permissions", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  permission_name: { // mantenemos el formato original
    type: Sequelize.STRING,
    allowNull: false,
    // unique: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Permission;
