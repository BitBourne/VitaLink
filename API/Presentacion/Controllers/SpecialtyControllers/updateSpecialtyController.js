import updateSpecialtyService from '../../../Negocio/specialtyServices/updateSpecialtyService.js';

const updateSpecialtyController = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = await updateSpecialtyService(id, req.body);
        res.status(200).json({
            success: true,
            message: 'Especialidad actualizada exitosamente',
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

export default updateSpecialtyController;
