import SpecialtyDAO from '../../Datos/DAOs/SpecialtyDAO.js';

const deleteSpecialtyService = async (id) => {
    try {
        const specialtyDAO = new SpecialtyDAO();

        const specialty = await specialtyDAO.findById(id);
        if (!specialty) {
            const error = new Error('Especialidad no encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Nota: Si hay doctores asociados, podría requerirse validación adicional
        // Por ahora permitimos eliminar (o el DAO manejará soft delete si está configurado)

        await specialtyDAO.delete(id);
        return { message: 'Especialidad eliminada exitosamente' };
    } catch (error) {
        throw error;
    }
};

export default deleteSpecialtyService;
