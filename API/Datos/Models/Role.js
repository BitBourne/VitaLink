import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Roles = db.define('roles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export default Roles;
