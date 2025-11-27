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
    },
});

export default Review;
