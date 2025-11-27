import updateDoctorSalaryService from '../../../Negocio/DoctorServices/updateDoctorSalaryService.js';

const updateDoctorSalaryController = async (req, res) => {
    try {
        const { doctorProfileId } = req.params;
        const { salary } = req.body;

        if (!salary) {
            return res.status(400).json({
                success: false,
                message: 'El campo salary es obligatorio'
            });
        }

        const doctor = await updateDoctorSalaryService(doctorProfileId, salary);

        res.status(200).json({
            success: true,
            message: 'Sueldo actualizado exitosamente',
            doctor
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default updateDoctorSalaryController;
