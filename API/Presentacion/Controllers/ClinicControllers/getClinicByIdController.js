import getClinicByIdService from '../../../Negocio/ClinicServices/getClinicByIdService.js';

const getClinicByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const clinic = await getClinicByIdService(id);

        res.status(200).json({
            success: true,
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

export default getClinicByIdController;
