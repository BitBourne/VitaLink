import getMedicalRecordService from '../../../Negocio/MedicalRecordServices/getMedicalRecordService.js';

const getMedicalRecord = async (req, res, next) => {
    try {
        const recordId = parseInt(req.params.id);

        const medicalRecord = await getMedicalRecordService(recordId);

        res.status(200).json({
            success: true,
            medicalRecord
        });
    } catch (error) {
        next(error);
    }
};

export default getMedicalRecord;
