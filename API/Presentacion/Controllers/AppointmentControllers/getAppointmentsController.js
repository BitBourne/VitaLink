import getAppointmentsService from '../../../Negocio/appointmentServices/getAppointmentsService.js';
import DoctorProfileDAO from '../../../Datos/DAOs/DoctorProfileDAO.js';

const getAppointments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const roleId = req.user.role_id;

        const filters = { ...req.query };

        if (roleId === 2) {
            // filters.patient_id = userId;
        // } else if (roleId === 3) {
            const doctorProfileDAO = new DoctorProfileDAO();
            const doctorProfile = await doctorProfileDAO.findOne({user_id: userId});
            if (doctorProfile) {
                filters.doctor_profile_id = doctorProfile.id;
            } else {
                return res.status(200).json({ success: true, appointments: [] });
            }
        } else if (roleId === 1) {

        } else if (roleId === 3) {
            filters.patient_id === userId
        }

        const appointments = await getAppointmentsService(filters);

        res.status(200).json({
            success: true,
            appointments
        });
    } catch (error) {
        next(error);
    }
};

export default getAppointments;
