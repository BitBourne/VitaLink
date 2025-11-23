// deleteAvailabilityController.js
import deleteAvailabilityService from "../../../Negocio/availabilityServices/deleteAvailabilityService.js";
import DoctorProfileDAO from "../../../Datos/DAOs/DoctorProfileDAO.js";

const deleteAvailabilityController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Obtener el doctor_profile_id del usuario autenticado
        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

        if (!doctorProfile) {
            const error = new Error('No tienes un perfil de doctor');
            error.statusCode = 403;
            throw error;
        }

        const result = await deleteAvailabilityService(parseInt(id), doctorProfile.id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default deleteAvailabilityController;
