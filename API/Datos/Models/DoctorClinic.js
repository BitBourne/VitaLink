import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const DoctorClinic = db.define("doctor_clinics", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    doctor_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export default DoctorClinic;
