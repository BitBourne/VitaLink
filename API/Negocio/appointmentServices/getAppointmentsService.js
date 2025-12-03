import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import Appointment from '../../Datos/Models/Appointment.js';
import User from '../../Datos/Models/User.js';
import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import Clinic from '../../Datos/Models/Clinic.js';
import Specialty from '../../Datos/Models/Specialty.js';
import { Op } from 'sequelize';

const getAppointmentsService = async (filters) => {
    const where = {};

    // Aplicar filtros básicos
    if (filters.patient_id) where.patient_id = filters.patient_id;
    if (filters.doctor_profile_id) where.doctor_profile_id = filters.doctor_profile_id;
    if (filters.status) where.status = filters.status;
    if (filters.date) where.appointment_date = filters.date;
    if (filters.clinic_id) where.clinic_id = filters.clinic_id;

    // Filtro de rango de fechas
    if (filters.date_from || filters.date_to) {
        where.appointment_date = {};
        if (filters.date_from) where.appointment_date[Op.gte] = filters.date_from;
        if (filters.date_to) where.appointment_date[Op.lte] = filters.date_to;
    }

    const appointments = await Appointment.findAll({
        where,
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
                attributes: ['id', 'name', 'address']
            }
        ],
        order: [['appointment_date', 'DESC'], ['appointment_time', 'DESC']]
    });

    // Formatear las citas para el frontend
    const formattedAppointments = appointments.map(apt => ({
        id: apt.id,
        patient_id: apt.patient_id,
        patient_name: apt.A_patient ? `${apt.A_patient.name} ${apt.A_patient.last_name}` : 'Sin información',
        patient_email: apt.A_patient?.email,
        doctor_profile_id: apt.doctor_profile_id,
        doctor_name: apt.A_doctor?.DP_user ?
            `Dr. ${apt.A_doctor.DP_user.name} ${apt.A_doctor.DP_user.last_name}` :
            'Sin información',
        doctor_email: apt.A_doctor?.DP_user?.email,
        specialties: apt.A_doctor?.DP_specialties?.map(s => s.name).join(', ') || 'N/A',
        specialty_list: apt.A_doctor?.DP_specialties?.map(s => ({ id: s.id, name: s.name })) || [],
        clinic_id: apt.clinic_id,
        clinic_name: apt.A_clinic?.name || (apt.is_telemedicine ? 'Telemedicina' : 'Sin clínica'),
        clinic_address: apt.A_clinic?.address,
        date: apt.appointment_date,
        time: apt.appointment_time,
        status: apt.status,
        reason: apt.reason,
        notes: apt.notes,
        is_telemedicine: apt.is_telemedicine,
        meeting_link: apt.meeting_link,
        created_at: apt.createdAt,
        updated_at: apt.updatedAt
    }));

    return formattedAppointments;
};

export default getAppointmentsService;

