import createSpecialtyService from '../../../Negocio/specialtyServices/createSpecialtyService.js';

const createSpecialtyController = async (req, res) => {
    try {
        const specialty = await createSpecialtyService(req.body);
        res.status(201).json({
            success: true,
            message: 'Especialidad creada exitosamente',
            data: specialty
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default createSpecialtyController;
