import MedicalRecordDAO from '../../Datos/DAOs/MedicalRecordDAO.js';
import { User, DoctorProfile, Appointment, Clinic } from '../../Datos/Models/Relations.js';

/**
 * Obtener el historial médico completo de un paciente con datos relacionados
 * @param {number} patientId - ID de usuario del paciente
 * @returns {Promise<Array>} Array de registros médicos con datos desencriptados y relaciones
 */
const getPatientMedicalHistoryService = async (patientId) => {
    const medicalRecordDAO = new MedicalRecordDAO();

    if (!patientId) {
        const error = new Error('Patient ID is required');
        error.statusCode = 400;
        throw error;
    }

    const records = await medicalRecordDAO.findPatientHistoryWithRelations(patientId, [
        {
            model: User,
            as: 'MR_patient',
            attributes: ['id', 'name', 'last_name', 'email'],
        },
        {
            model: DoctorProfile,
            as: 'MR_doctor',
            include: [
                {
                    model: User,
                    as: 'DP_user',
                    attributes: ['id', 'name', 'last_name', 'email'],
                },
            ],
        },
        {
            model: Appointment,
            as: 'MR_appointment',
            attributes: ['id', 'appointment_date', 'appointment_time', 'reason', 'is_telemedicine'],
            include: [
                {
                    model: Clinic,
                    as: 'A_clinic',
                    attributes: ['id', 'name', 'address', 'city', 'state'],
                },
            ],
        },
    ]);

    const decryptedRecords = records.map(record => medicalRecordDAO.decryptRecord(record));

    return decryptedRecords;
};

export default getPatientMedicalHistoryService;
