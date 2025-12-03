import reassignDoctorService from '../../../Negocio/appointmentServices/reassignDoctorService.js';

/**
 * Controlador para reasignar un doctor a una cita
 */
const reassignDoctorController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { doctor_profile_id } = req.body;

        if (!doctor_profile_id) {
            const error = new Error('El ID del doctor es requerido');
            error.statusCode = 400;
            throw error;
        }

        const updatedAppointment = await reassignDoctorService(
            parseInt(id),
            parseInt(doctor_profile_id)
        );

        res.status(200).json({
            success: true,
            msg: 'Doctor reasignado exitosamente',
            data: updatedAppointment
        });
    } catch (error) {
        next(error);
    }
};

export default reassignDoctorController;
