import createClinicService from '../../../Negocio/clinicServices/createClinicService.js';

const createClinicController = async (req, res) => {
    try {
        const clinicData = req.body;
        const clinic = await createClinicService(clinicData);

        res.status(201).json({
            success: true,
            message: 'Clínica creada exitosamente',
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

export default createClinicController;
