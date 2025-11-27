import setAvailabilityService from "../../../Negocio/availabilityServices/setAvailabilityService.js";
import DoctorProfileDAO from "../../../Datos/DAOs/DoctorProfileDAO.js";

const setAvailabilityController = async (req, res, next) => {
    try {
        const { day_of_week, start_time, end_time, is_available } = req.body;
        const userId = req.user.id;

        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

        if (!doctorProfile) {
            const error = new Error('No tienes un perfil de doctor');
            error.statusCode = 403;
            throw error;
        }

        const result = await setAvailabilityService({
            doctor_profile_id: doctorProfile.id,
            day_of_week,
            start_time,
            end_time,
            is_available,
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export default setAvailabilityController;
