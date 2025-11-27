import getAppointmentByIdService from '../../../Negocio/appointmentServices/getAppointmentByIdService.js';

const getAppointmentById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const appointment = await getAppointmentByIdService(id);

        res.json({
            success: true,
            appointment
        });

    } catch (error) {
        next(error);
    }
};

export default getAppointmentById;
