import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export default User;
