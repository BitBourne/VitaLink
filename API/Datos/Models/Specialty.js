// Specialty.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Specialty = db.define("specialties", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

export default Specialty;
