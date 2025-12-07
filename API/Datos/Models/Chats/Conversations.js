import { DataTypes } from "sequelize";
import db from "../../../Infraestructura/config/db.js";

const Conversation = db.define("conversations", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    appointment_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    doctor_profile_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    patient_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
});

export default Conversation;
