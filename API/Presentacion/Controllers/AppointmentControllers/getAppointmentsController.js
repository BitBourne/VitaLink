import getAppointmentsService from '../../../Negocio/appointmentServices/getAppointmentsService.js';
import DoctorProfileDAO from '../../../Datos/DAOs/DoctorProfileDAO.js';

const getAppointments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const roleId = req.user.role_id;

        const filters = { ...req.query };

        if (roleId === 2) {
<<<<<<< HEAD
            // filters.patient_id = userId;
        // } else if (roleId === 3) {
            const doctorProfileDAO = new DoctorProfileDAO();
            const doctorProfile = await doctorProfileDAO.findOne({user_id: userId});
=======
            // Doctor - find their doctor profile and filter by it
            const doctorProfileDAO = new DoctorProfileDAO();
            const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });
>>>>>>> remotes/origin/nova_test3
            if (doctorProfile) {
                filters.doctor_profile_id = doctorProfile.id;
            } else {
                return res.status(200).json({ success: true, appointments: [] });
            }
<<<<<<< HEAD
        } else if (roleId === 1) {

=======
>>>>>>> remotes/origin/nova_test3
        } else if (roleId === 3) {
            // Patient - filter by patient_id
            filters.patient_id = userId;
        } else if (roleId === 1) {
            // Admin - no filters, show all appointments
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
