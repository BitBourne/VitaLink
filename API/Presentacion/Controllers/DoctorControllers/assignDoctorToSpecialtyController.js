import assignDoctorToSpecialtyService from '../../../Negocio/doctorServices/assignDoctorToSpecialtyService.js';

const assignDoctorToSpecialty = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { specialtyId } = req.body;

        if (!specialtyId) {
            return res.status(400).json({
                success: false,
                message: 'Se requiere specialtyId'
            });
        }

        const result = await assignDoctorToSpecialtyService(doctorId, specialtyId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default assignDoctorToSpecialty;
