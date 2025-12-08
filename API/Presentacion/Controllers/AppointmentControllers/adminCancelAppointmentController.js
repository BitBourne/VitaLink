import { adminCancelAppointmentService } from "../../../Negocio/appointmentServices/adminCancelAppointmentService.js";

/**
 * Controlador para que el admin cancele una cita
 */
export const adminCancelAppointmentController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;

        const appointment = await adminCancelAppointmentService(parseInt(id), reason);

        res.status(200).json({
            success: true,
            msg: 'Cita cancelada por administración',
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};