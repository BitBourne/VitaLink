import createAppointmentService from '../../../Negocio/appointmentServices/createAppointmentService.js';
import DoctorProfileDAO from '../../../Datos/DAOs/DoctorProfileDAO.js';

const createAppointment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRoles = req.user.roles;
        const { patient_id, doctor_profile_id, clinic_id, appointment_date, appointment_time, reason, is_telemedicine } = req.body;

        let appointmentData;

        const isDoctor = userRoles.includes('doctor');

        if (isDoctor) {
            if (!patient_id) {
                const error = new Error('patient_id es obligatorio cuando el doctor crea una cita');
                error.statusCode = 400;
                throw error;
            }

            const doctorProfileDAO = new DoctorProfileDAO();
            const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

            if (!doctorProfile) {
                const error = new Error('No tienes un perfil de doctor activo');
                error.statusCode = 403;
                throw error;
            }

            appointmentData = {
                patient_id,
                doctor_profile_id: doctorProfile.id,
                clinic_id,
                appointment_date,
                appointment_time,
                reason,
                is_telemedicine
            };
        } else {
            appointmentData = {
                patient_id: userId,
                doctor_profile_id,
                clinic_id,
                appointment_date,
                appointment_time,
                reason,
                is_telemedicine
            };
        }

        const appointment = await createAppointmentService(appointmentData);

        res.status(201).json({
            success: true,
            message: 'Cita creada exitosamente',
            appointment
        });
    } catch (error) {
        next(error);
    }
};

export default createAppointment;
