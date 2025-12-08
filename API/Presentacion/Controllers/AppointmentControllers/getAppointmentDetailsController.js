import getAppointmentDetailsService from '../../../Negocio/appointmentServices/getAppointmentDetailsService.js';

/**
 * Controlador para obtener detalles completos de una cita
 */
const getAppointmentDetailsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const appointmentDetails = await getAppointmentDetailsService(parseInt(id));

        res.status(200).json({
            success: true,
            data: appointmentDetails
        });
    } catch (error) {
        next(error);
    }
};

export default getAppointmentDetailsController;