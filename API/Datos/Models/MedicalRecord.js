import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

const MedicalRecord = db.define("medical_records", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    patient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea a la tabla de usuarios (paciente)',
    },
    doctor_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: 'Clave foránea a la tabla de perfiles de doctor',
    },
    appointment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: 'Enlace opcional a la cita',
    },
    record_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Fecha del registro médico',
    },
    // Campos sensibles encriptados (cumplimiento HIPAA)
    diagnosis: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Información de diagnóstico encriptada',
    },
    treatment: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Plan de tratamiento encriptado',
    },
    prescriptions: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Prescripciones encriptadas (cadena JSON)',
    },
    notes: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Notas adicionales encriptadas',
    },
    // Campos no encriptados
    vital_signs: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'Signos vitales: presión arterial, frecuencia cardíaca, temperatura, etc.',
    },
    allergies: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Alergias del paciente',
    },
    is_confidential: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Bandera de protección extra para registros altamente sensibles',
    },
    is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: 'Bandera de eliminación suave para cumplimiento HIPAA (retener registros)',
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'medical_records',
});

export default MedicalRecord;
