import getAllClinicsService from '../../../Negocio/clinicServices/getAllClinicsService.js';

const getAllClinicsController = async (req, res) => {
    try {
        const filters = req.query;
        const clinics = await getAllClinicsService(filters);

        res.status(200).json({
            success: true,
            count: clinics.length,
            clinics
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default getAllClinicsController;
