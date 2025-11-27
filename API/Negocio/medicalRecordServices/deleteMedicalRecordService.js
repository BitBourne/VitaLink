import MedicalRecordDAO from '../../Datos/DAOs/MedicalRecordDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

/**
 * Eliminación suave de un registro médico (cumplimiento HIPAA - retener registros)
 * Solo el doctor creador o un administrador pueden eliminar
 * @param {number} recordId - ID del registro médico
 * @param {number} userId - ID del usuario que realiza la eliminación
 * @param {Array<string>} userRoles - Roles del usuario
 * @returns {Promise<Object>} Mensaje de éxito
 */
const deleteMedicalRecordService = async (recordId, userId, userRoles) => {
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
        const error = new Error('Medical record is already deleted');
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
        const error = new Error('Only the creating doctor or admin can delete this medical record');
        error.statusCode = 403;
        throw error;
    }

    await medicalRecordDAO.softDelete(recordId);

    return {
        success: true,
        message: 'Medical record deleted successfully',
    };
};

export default deleteMedicalRecordService;
