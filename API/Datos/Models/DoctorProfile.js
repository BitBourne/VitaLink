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
  medical_license_number: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cedula_profesional: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  license_verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  cedula_verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  verification_notes: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  medical_license_document_url: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  cedula_document_url: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  additional_documents_urls: {
    type: Sequelize.JSON,
    allowNull: true,
  },
  verification_status: {
    type: Sequelize.ENUM('pending', 'documents_requested', 'under_review', 'verified', 'rejected'),
    defaultValue: 'pending',
  },
  verified_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  verified_by_admin_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

export default DoctorProfile;
