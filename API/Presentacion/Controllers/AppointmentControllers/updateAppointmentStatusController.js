import updateAppointmentStatusService from '../../../Negocio/appointmentServices/updateAppointmentStatusService.js';

const updateAppointmentStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, notes, meeting_link } = req.body;
        const userId = req.user.id;

        const updatedAppointment = await updateAppointmentStatusService(
            id,
            status,
            notes,
            meeting_link,
            userId
        );

        res.status(200).json({
            success: true,
            message: `Cita actualizada a estado: ${status}`,
            appointment: updatedAppointment
        });
    } catch (error) {
        next(error);
    }
};

export default updateAppointmentStatus;
