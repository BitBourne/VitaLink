import createMedicalRecordService from '../../../Negocio/MedicalRecordServices/createMedicalRecordService.js';

const createMedicalRecord = async (req, res, next) => {
    try {
        const userId = req.user.id;
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
        } = req.body;

        const medicalRecordData = {
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
        };

        const medicalRecord = await createMedicalRecordService(medicalRecordData, userId);

        res.status(201).json({
            success: true,
            message: 'Medical record created successfully',
            medicalRecord
        });
    } catch (error) {
        next(error);
    }
};

export default createMedicalRecord;
