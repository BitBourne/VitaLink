import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';
import DoctorAvailabilityDAO from '../../Datos/DAOs/DoctorAvailabilityDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';
import sendAppointmentEmail from './helpers/sendAppointmentEmail.js';
// import createConversationService from '../conversationServices/conversationService.js';

const createAppointmentService = async (appointmentDTO, creatorUserId) => {
    const { patient_id, doctor_profile_id, clinic_id, appointment_date, appointment_time, reason, is_telemedicine } = appointmentDTO;

    const appointmentDAO = new AppointmentDAO();
    const doctorAvailabilityDAO = new DoctorAvailabilityDAO();
    const userDAO = new UserDAO(); 
    const doctorProfileDAO = new DoctorProfileDAO();
    const clinicDAO = new ClinicDAO();

    if (!patient_id || !doctor_profile_id || !appointment_date || !appointment_time || !reason) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (!is_telemedicine && !clinic_id) {
        const error = new Error('clinic_id es obligatorio para citas presenciales');
        error.statusCode = 400;
        throw error;
    }    

    if (clinic_id) {
        const doctorClinicDAO = new (await import('../../Datos/DAOs/DoctorClinicDAO.js')).default();

        const worksAtClinic = await doctorClinicDAO.doctorWorksAtClinic(doctor_profile_id, clinic_id);

        if (!worksAtClinic) {
            const error = new Error('El doctor no trabaja en la clínica especificada');
            error.statusCode = 400;
            throw error;
        }
    }

    const appointmentDateTime = new Date(`${appointment_date}T${appointment_time}`);
    const now = new Date();
    if (appointmentDateTime <= now) {
        const error = new Error('La cita debe ser en una fecha y hora futura');
        error.statusCode = 400;
        throw error;
    }

    const isSlotFree = await appointmentDAO.checkSlotAvailability(doctor_profile_id, appointment_date, appointment_time);
    if (!isSlotFree) {
        const error = new Error('Este horario ya está ocupado');
        error.statusCode = 400;
        throw error;
    }

    // Crear la cita
    const newAppointment = await appointmentDAO.create({
        patient_id,
        doctor_profile_id,
        clinic_id: clinic_id || null,
        appointment_date,
        appointment_time,
        reason,
        is_telemedicine,
        status: 'pending'
    });

    // Obtener datos del doctor para la conversación
    // const doctorProfile = await doctorProfileDAO.findById(doctor_profile_id);

    // Crear la conversación inmediatamente después de crear la cita
    // const conversation = await createConversationService({
    //     appointment_id: newAppointment.id,
    //     doctor_profile_id: doctorProfile.user_id, 
    //     patient_id
    // }, creatorUserId);

    return {
        newAppointment,
        // conversationId: conversation.id
    };
};

export default createAppointmentService;
