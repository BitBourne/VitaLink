import updateMedicalRecordService from '../../../Negocio/MedicalRecordServices/updateMedicalRecordService.js';

const updateMedicalRecord = async (req, res, next) => {
    try {
        const recordId = parseInt(req.params.id);
        const userId = req.user.id;
        const userRoles = req.user.roles;
        const updateData = req.body;

        const medicalRecord = await updateMedicalRecordService(recordId, updateData, userId, userRoles);

        res.status(200).json({
            success: true,
            message: 'Medical record updated successfully',
            medicalRecord
        });
    } catch (error) {
        next(error);
    }
};

export default updateMedicalRecord;
