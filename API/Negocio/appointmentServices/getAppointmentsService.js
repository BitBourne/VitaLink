import AppointmentDAO from '../../Datos/DAOs/AppointmentDAO.js';

const getAppointmentsService = async (filters) => {
    const appointmentDAO = new AppointmentDAO();
    const appointments = await appointmentDAO.findAll(filters);

    return appointments;
};

export default getAppointmentsService;
