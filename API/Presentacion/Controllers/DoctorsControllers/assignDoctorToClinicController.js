import assignDoctorToClinicService from '../../../Negocio/doctorsServices/assignDoctorToClinicService.js';

const assignDoctorToClinicController = async (req, res) => {
    try {
        const { doctorProfileId } = req.params;
        const { clinicId, salary } = req.body;

        if (!clinicId) {
            return res.status(400).json({
                success: false,
                message: 'El campo clinicId es obligatorio'
            });
        }

        const doctor = await assignDoctorToClinicService(doctorProfileId, clinicId, salary);

        res.status(200).json({
            success: true,
            message: 'Doctor asignado a clínica exitosamente',
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

export default assignDoctorToClinicController;
