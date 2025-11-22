// DoctorProfile.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";
import User from "./User.js";

const DoctorProfile = db.define("doctor_profiles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  location: {
    type: Sequelize.STRING, // Ej: "CDMX, Polanco"
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price_min: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  price_max: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  experience_years: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

export default DoctorProfile;
