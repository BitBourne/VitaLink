import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import Appointment from '../../Datos/Models/Appointment.js';
import User from '../../Datos/Models/User.js';
import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import Clinic from '../../Datos/Models/Clinic.js';
import Specialty from '../../Datos/Models/Specialty.js';

/**
 * Servicio para obtener detalles completos de una cita
 * Incluye información del paciente, doctor, clínica y especialidades
 */
const getAppointmentDetailsService = async (appointmentId) => {
    const appointment = await Appointment.findByPk(appointmentId, {
        include: [
            {
                model: User,
                as: 'A_patient',
                attributes: ['id', 'name', 'last_name', 'email']
            },
            {
                model: DoctorProfile,
                as: 'A_doctor',
                include: [
                    {
                        model: User,
                        as: 'DP_user',
                        attributes: ['id', 'name', 'last_name', 'email']
                    },
                    {
                        model: Specialty,
                        as: 'DP_specialties',
                        attributes: ['id', 'name'],
                        through: { attributes: [] }
                    }
                ]
            },
            {
                model: Clinic,
                as: 'A_clinic',
                attributes: ['id', 'name', 'address', 'phone']
            }
        ]
    });

    if (!appointment) {
        const error = new Error('Cita no encontrada');
        error.statusCode = 404;
        throw error;
    }

    // Formatear la respuesta
    const formattedAppointment = {
        id: appointment.id,
        date: appointment.appointment_date,
        time: appointment.appointment_time,
        status: appointment.status,
        reason: appointment.reason,
        notes: appointment.notes,
        is_telemedicine: appointment.is_telemedicine,
        meeting_link: appointment.meeting_link,
        patient: appointment.A_patient ? {
            id: appointment.A_patient.id,
            name: `${appointment.A_patient.name} ${appointment.A_patient.last_name}`,
            email: appointment.A_patient.email
        } : null,
        doctor: appointment.A_doctor ? {
            id: appointment.A_doctor.id,
            user_id: appointment.A_doctor.DP_user?.id,
            name: appointment.A_doctor.DP_user ?
                `${appointment.A_doctor.DP_user.name} ${appointment.A_doctor.DP_user.last_name}` :
                'Sin información',
            email: appointment.A_doctor.DP_user?.email,
            license_number: appointment.A_doctor.license_number,
            specialties: appointment.A_doctor.DP_specialties?.map(s => ({
                id: s.id,
                name: s.name
            })) || []
        } : null,
        clinic: appointment.A_clinic ? {
            id: appointment.A_clinic.id,
            name: appointment.A_clinic.name,
            address: appointment.A_clinic.address,
            phone: appointment.A_clinic.phone
        } : null,
        created_at: appointment.createdAt,
        updated_at: appointment.updatedAt
    };

    return formattedAppointment;
};

export default getAppointmentDetailsService;
