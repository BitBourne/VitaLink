import updateClinicService from '../../../Negocio/ClinicServices/updateClinicService.js';

const updateClinicController = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const clinic = await updateClinicService(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Clínica actualizada exitosamente',
            clinic
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default updateClinicController;
