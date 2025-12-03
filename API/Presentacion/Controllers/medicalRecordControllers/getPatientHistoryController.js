import getPatientMedicalHistoryService from '../../../Negocio/MedicalRecordServices/getPatientMedicalHistoryService.js';

const getPatientHistory = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);

        const medicalHistory = await getPatientMedicalHistoryService(patientId);

        res.status(200).json({
            success: true,
            count: medicalHistory.length,
            medicalHistory
        });
    } catch (error) {
        next(error);
    }
};

export default getPatientHistory;
