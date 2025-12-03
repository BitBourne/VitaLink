import { Sequelize } from "sequelize";
import db from "../../../Infraestructura/config/db.js";

const Message = db.define("messages", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },

    conversation_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false 
    },

    sender_id: {  // doctor o paciente
        type: Sequelize.INTEGER, 
        allowNull: false 
    }, 
    message: { 
        type: Sequelize.TEXT, 
        allowNull: false 
    },
    sent_at: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW 
    }
});

export default Message;
