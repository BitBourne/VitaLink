import rejectDoctorCredentials from '../../../Negocio/doctorServices/rejectDoctorCredentials.js';

/**
 * Controller para rechazar credenciales de doctor
 */
const rejectDoctorCredentialsController = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { verification_notes } = req.body;

        const result = await rejectDoctorCredentials(doctorId, { verification_notes });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default rejectDoctorCredentialsController;
