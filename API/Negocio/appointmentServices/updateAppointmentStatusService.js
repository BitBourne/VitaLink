import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import sendAppointmentEmail from './helpers/sendAppointmentEmail.js';

const updateAppointmentStatusService = async (id, status, notes, meeting_link, userId) => {
    const appointmentDAO = new AppointmentDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    const appointment = await appointmentDAO.findById(id);
    if (!appointment) {
        const error = new Error('Cita no encontrada');
        error.statusCode = 404;
        throw error;
    }

    const isPatient = appointment.patient_id === userId;

    let isDoctor = false;
    if (appointment.A_doctor && appointment.A_doctor.user_id === userId) {
        isDoctor = true;
    }

    if (!isPatient && !isDoctor) {
        const error = new Error('No tienes permiso para modificar esta cita');
        error.statusCode = 403;
        throw error;
    }

    if ((status === 'confirmed' || status === 'completed') && !isDoctor) {
        const error = new Error('Solo el doctor puede confirmar o completar citas');
        error.statusCode = 403;
        throw error;
    }

    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
        const error = new Error('Estado inválido');
        error.statusCode = 400;
        throw error;
    }

    const updateData = { status };
    if (notes) updateData.notes = notes;
    if (meeting_link) updateData.meeting_link = meeting_link;

    await appointmentDAO.update(id, updateData);

    const updatedAppointment = await appointmentDAO.findById(id);

    return {
        id: updatedAppointment.id,
        patient_id: updatedAppointment.patient_id,
        doctor_profile_id: updatedAppointment.doctor_profile_id,
        clinic_id: updatedAppointment.clinic_id,
        appointment_date: updatedAppointment.appointment_date,
        appointment_time: updatedAppointment.appointment_time,
        status: updatedAppointment.status,
        reason: updatedAppointment.reason,
        notes: updatedAppointment.notes,
        is_telemedicine: updatedAppointment.is_telemedicine,
        meeting_link: updatedAppointment.meeting_link
    };
};

export default updateAppointmentStatusService;
