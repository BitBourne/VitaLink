// Review.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const Review = db.define("reviews", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    doctor_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // ID del usuario (paciente) que hace la review
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        // True si el paciente tuvo una cita confirmada con el doctor
    },
});

export default Review;
