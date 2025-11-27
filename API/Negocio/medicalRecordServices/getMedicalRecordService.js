import MedicalRecordDAO from '../../Datos/DAOs/MedicalRecordDAO.js';

/**
 * Obtener un único registro médico por ID con datos sensibles desencriptados
 * @param {number} recordId - ID del registro médico
 * @returns {Promise<Object>} Registro médico con datos desencriptados
 */
const getMedicalRecordService = async (recordId) => {
    const medicalRecordDAO = new MedicalRecordDAO();

    if (!recordId) {
        const error = new Error('Record ID is required');
        error.statusCode = 400;
        throw error;
    }

    const record = await medicalRecordDAO.findByIdWithDecryption(recordId);

    if (!record) {
        const error = new Error('Medical record not found');
        error.statusCode = 404;
        throw error;
    }

    if (record.is_deleted) {
        const error = new Error('Medical record has been deleted');
        error.statusCode = 404;
        throw error;
    }

    return record;
};

export default getMedicalRecordService;
