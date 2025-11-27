import MedicalRecordDAO from '../../Datos/DAOs/MedicalRecordDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import { encryptFields } from '../../Infraestructura/utils/encryptionUtils.js';

/**
 * Actualizar un registro médico con datos sensibles encriptados
 * Solo el doctor creador o un administrador pueden actualizar
 * @param {number} recordId - ID del registro médico
 * @param {Object} updateData - Datos a actualizar
 * @param {number} userId - ID del usuario que realiza la actualización
 * @param {Array<string>} userRoles - Roles del usuario
 * @returns {Promise<Object>} Registro médico actualizado con datos desencriptados
 */
const updateMedicalRecordService = async (recordId, updateData, userId, userRoles) => {
    const medicalRecordDAO = new MedicalRecordDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    if (!recordId) {
        const error = new Error('Record ID is required');
        error.statusCode = 400;
        throw error;
    }

    const existingRecord = await medicalRecordDAO.findById(recordId);
    if (!existingRecord) {
        const error = new Error('Medical record not found');
        error.statusCode = 404;
        throw error;
    }

    if (existingRecord.is_deleted) {
        const error = new Error('Cannot update a deleted medical record');
        error.statusCode = 400;
        throw error;
    }

    const isAdmin = userRoles.includes('admin');
    let isCreatingDoctor = false;

    if (userRoles.includes('doctor')) {
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });
        if (doctorProfile && doctorProfile.id === existingRecord.doctor_profile_id) {
            isCreatingDoctor = true;
        }
    }

    if (!isAdmin && !isCreatingDoctor) {
        const error = new Error('Only the creating doctor or admin can update this medical record');
        error.statusCode = 403;
        throw error;
    }

    const sensitiveFields = ['diagnosis', 'treatment', 'prescriptions', 'notes'];
    const fieldsToEncrypt = sensitiveFields.filter(field => updateData[field] !== undefined);

    let dataToUpdate = { ...updateData };
    if (fieldsToEncrypt.length > 0) {
        dataToUpdate = encryptFields(dataToUpdate, fieldsToEncrypt);
    }

    delete dataToUpdate.id;
    delete dataToUpdate.patient_id;
    delete dataToUpdate.doctor_profile_id;
    delete dataToUpdate.created_at;

    const updatedRecord = await medicalRecordDAO.update(recordId, dataToUpdate);

    const decryptedRecord = medicalRecordDAO.decryptRecord(updatedRecord);

    return decryptedRecord;
};

export default updateMedicalRecordService;
