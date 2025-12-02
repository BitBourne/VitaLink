import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Appointment = db.define("appointments", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    doctor_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    clinic_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Null si es telemedicina
    },
    appointment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    appointment_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
        defaultValue: 'pending',
        allowNull: false,
    },
    reason: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    notes: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    is_telemedicine: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    meeting_link: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

export default Appointment;
