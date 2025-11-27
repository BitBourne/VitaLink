import MedicalRecordDAO from '../../Datos/DAOs/MedicalRecordDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import { encryptFields } from '../../Infraestructura/utils/encryptionUtils.js';

/**
 * Crear un nuevo registro médico con datos sensibles encriptados
 * @param {Object} medicalRecordDTO - Objeto de transferencia de datos del registro médico
 * @param {number} doctorUserId - ID de usuario del doctor que crea el registro
 * @returns {Promise<Object>} Registro médico creado con datos desencriptados
 */
const createMedicalRecordService = async (medicalRecordDTO, doctorUserId) => {
    const {
        patient_id,
        appointment_id,
        record_date,
        diagnosis,
        treatment,
        prescriptions,
        notes,
        vital_signs,
        allergies,
        is_confidential
    } = medicalRecordDTO;

    const medicalRecordDAO = new MedicalRecordDAO();
    const doctorProfileDAO = new DoctorProfileDAO();
    const userDAO = new UserDAO();

    if (!patient_id || !record_date) {
        const error = new Error('patient_id and record_date are required');
        error.statusCode = 400;
        throw error;
    }

    const doctorProfile = await doctorProfileDAO.findOne({ user_id: doctorUserId });
    if (!doctorProfile) {
        const error = new Error('Doctor profile not found');
        error.statusCode = 404;
        throw error;
    }

    const patient = await userDAO.findById(patient_id);
    if (!patient) {
        const error = new Error('Patient not found');
        error.statusCode = 404;
        throw error;
    }

    if (appointment_id) {
        const appointmentDAO = new AppointmentDAO();
        const appointment = await appointmentDAO.findById(appointment_id);

        if (!appointment) {
            const error = new Error('Appointment not found');
            error.statusCode = 404;
            throw error;
        }

        if (appointment.patient_id !== patient_id || appointment.doctor_profile_id !== doctorProfile.id) {
            const error = new Error('Appointment does not match patient and doctor');
            error.statusCode = 400;
            throw error;
        }

        const existingRecord = await medicalRecordDAO.findByAppointmentId(appointment_id);
        if (existingRecord) {
            const error = new Error('A medical record already exists for this appointment');
            error.statusCode = 400;
            throw error;
        }
    }

    const sensitiveFields = ['diagnosis', 'treatment', 'prescriptions', 'notes'];
    const encryptedData = encryptFields(medicalRecordDTO, sensitiveFields);

    const newRecord = await medicalRecordDAO.create({
        patient_id,
        doctor_profile_id: doctorProfile.id,
        appointment_id: appointment_id || null,
        record_date,
        diagnosis: encryptedData.diagnosis || null,
        treatment: encryptedData.treatment || null,
        prescriptions: encryptedData.prescriptions || null,
        notes: encryptedData.notes || null,
        vital_signs: vital_signs || null,
        allergies: allergies || null,
        is_confidential: is_confidential || false,
    });

    const decryptedRecord = medicalRecordDAO.decryptRecord(newRecord);

    return decryptedRecord;
};

export default createMedicalRecordService;
