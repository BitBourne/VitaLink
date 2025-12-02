import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const DoctorAvailability = db.define("doctor_availabilities", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    doctor_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    day_of_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 6,
        },
    },
    start_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    end_time: {
        type: Sequelize.TIME,
        allowNull: false,
    },
    is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
});

export default DoctorAvailability;
