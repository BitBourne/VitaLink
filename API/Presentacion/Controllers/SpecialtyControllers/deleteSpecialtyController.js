import deleteSpecialtyService from '../../../Negocio/specialtyServices/deleteSpecialtyService.js';

const deleteSpecialtyController = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteSpecialtyService(id);
        res.status(200).json({
            success: true,
            message: 'Especialidad eliminada exitosamente'
        });
    } catch (error) {
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

export default deleteSpecialtyController;
