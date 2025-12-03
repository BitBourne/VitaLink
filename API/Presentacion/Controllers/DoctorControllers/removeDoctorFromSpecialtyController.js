import removeDoctorFromSpecialtyService from '../../../Negocio/doctorServices/removeDoctorFromSpecialtyService.js';

const removeDoctorFromSpecialty = async (req, res) => {
    try {
        const { doctorId, specialtyId } = req.params;

        const result = await removeDoctorFromSpecialtyService(doctorId, specialtyId);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default removeDoctorFromSpecialty;
