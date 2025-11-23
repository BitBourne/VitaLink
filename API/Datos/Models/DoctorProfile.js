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
  location: {
    type: Sequelize.STRING,
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
  experience_years: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  salary: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  clinic_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'clinics',
      key: 'id'
    }
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  average_rating: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: true,
    defaultValue: 0.00,
    validate: {
      min: 0,
      max: 5,
    },
  },
  total_reviews: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

export default DoctorProfile;
