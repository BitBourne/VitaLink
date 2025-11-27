import deleteMedicalRecordService from '../../../Negocio/MedicalRecordServices/deleteMedicalRecordService.js';

const deleteMedicalRecord = async (req, res, next) => {
    try {
        const recordId = parseInt(req.params.id);
        const userId = req.user.id;
        const userRoles = req.user.roles;

        const result = await deleteMedicalRecordService(recordId, userId, userRoles);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default deleteMedicalRecord;
