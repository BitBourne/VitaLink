import BaseDAO from './BaseDAO.js';
import MedicalRecord from '../Models/MedicalRecord.js';
import { decryptFields } from '../../Infraestructura/utils/encryptionUtils.js';

class MedicalRecordDAO extends BaseDAO {
    constructor() {
        super(MedicalRecord);
    }

    /**
     * Encontrar todos los registros médicos de un paciente específico
     * @param {number} patientId - ID de usuario del paciente
     * @param {boolean} includeDeleted - Si incluir registros eliminados suavemente
     * @returns {Promise<Array>} Array de registros médicos
     */
    async findByPatientId(patientId, includeDeleted = false) {
        const whereClause = { patient_id: patientId };

        if (!includeDeleted) {
            whereClause.is_deleted = false;
        }

        return await this.model.findAll({
            where: whereClause,
            order: [['record_date', 'DESC'], ['created_at', 'DESC']],
        });
    }

    /**
     * Encontrar todos los registros médicos creados por un doctor específico
     * @param {number} doctorProfileId - ID de perfil del doctor
     * @param {boolean} includeDeleted - Si incluir registros eliminados suavemente
     * @returns {Promise<Array>} Array de registros médicos
     */
    async findByDoctorId(doctorProfileId, includeDeleted = false) {
        const whereClause = { doctor_profile_id: doctorProfileId };

        if (!includeDeleted) {
            whereClause.is_deleted = false;
        }

        return await this.model.findAll({
            where: whereClause,
            order: [['record_date', 'DESC'], ['created_at', 'DESC']],
        });
    }

    /**
     * Encontrar registro médico vinculado a una cita específica
     * @param {number} appointmentId - ID de la cita
     * @returns {Promise<Object|null>} Registro médico o null
     */
    async findByAppointmentId(appointmentId) {
        return await this.model.findOne({
            where: {
                appointment_id: appointmentId,
                is_deleted: false
            },
        });
    }

    /**
     * Encontrar un registro médico por ID con campos sensibles desencriptados
     * @param {number} id - ID del registro médico
     * @returns {Promise<Object|null>} Registro médico con campos desencriptados
     */
    async findByIdWithDecryption(id) {
        const record = await this.findById(id);

        if (!record) {
            return null;
        }

        const decryptedRecord = this.decryptRecord(record);

        return decryptedRecord;
    }

    /**
     * Encontrar todos los registros con desencriptación
     * @param {Object} options - Opciones de consulta de Sequelize
     * @returns {Promise<Array>} Array de registros médicos con campos desencriptados
     */
    async findAllWithDecryption(options = {}) {
        const records = await this.findAll(options);

        return records.map(record => this.decryptRecord(record));
    }

    /**
     * Desencriptar campos sensibles en un registro médico
     * @param {Object} record - Instancia de registro médico
     * @returns {Object} Registro con campos desencriptados
     */
    decryptRecord(record) {
        if (!record) return null;

        const recordData = record.toJSON ? record.toJSON() : record;

        const sensitiveFields = ['diagnosis', 'treatment', 'prescriptions', 'notes'];

        return decryptFields(recordData, sensitiveFields);
    }

    /**
     * Eliminación suave de un registro médico (cumplimiento HIPAA - retener registros)
     * @param {number} id - ID del registro médico
     * @returns {Promise<Object>} Registro actualizado
     */
    async softDelete(id) {
        const instance = await this.model.findByPk(id);
        if (!instance) throw new Error('Medical record not found');

        return await instance.update({
            is_deleted: true,
            updated_at: new Date()
        });
    }

    /**
     * Encontrar registros con datos relacionados (paciente, doctor, cita)
     * @param {number} id - ID del registro médico
     * @param {Array} include - Array de asociaciones a incluir
     * @returns {Promise<Object|null>} Registro médico con datos relacionados
     */
    async findByIdWithRelations(id, include = []) {
        return await this.model.findByPk(id, {
            include,
            where: { is_deleted: false }
        });
    }

    /**
     * Encontrar historial médico del paciente con datos relacionados
     * @param {number} patientId - ID de usuario del paciente
     * @param {Array} include - Array de asociaciones a incluir
     * @returns {Promise<Array>} Array de registros médicos con datos relacionados
     */
    async findPatientHistoryWithRelations(patientId, include = []) {
        return await this.model.findAll({
            where: {
                patient_id: patientId,
                is_deleted: false
            },
            include,
            order: [['record_date', 'DESC'], ['created_at', 'DESC']],
        });
    }
}

export default MedicalRecordDAO;
