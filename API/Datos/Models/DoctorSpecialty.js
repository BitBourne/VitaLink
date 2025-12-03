import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";
import DoctorProfile from "./DoctorProfile.js";
import Specialty from "./Specialty.js";

const DoctorSpecialty = db.define("doctor_specialties", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doctor_profile_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: DoctorProfile,
      key: "id",
    },
  },
  specialty_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Specialty,
      key: "id",
    },
  },
});

export default DoctorSpecialty;
