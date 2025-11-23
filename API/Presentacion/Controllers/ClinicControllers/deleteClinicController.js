import deleteClinicService from '../../../Negocio/clinicServices/deleteClinicService.js';

const deleteClinicController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteClinicService(id);

        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default deleteClinicController;
