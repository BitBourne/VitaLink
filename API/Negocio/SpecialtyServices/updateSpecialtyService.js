import SpecialtyDAO from '../../Datos/DAOs/SpecialtyDAO.js';

const updateSpecialtyService = async (id, data) => {
    try {
        const specialtyDAO = new SpecialtyDAO();

        const specialty = await specialtyDAO.findById(id);
        if (!specialty) {
            const error = new Error('Especialidad no encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Si se actualiza el nombre, verificar duplicados
        if (data.name && data.name !== specialty.name) {
            const existingSpecialty = await specialtyDAO.findOne({ name: data.name });
            if (existingSpecialty) {
                const error = new Error('Ya existe otra especialidad con ese nombre');
                error.statusCode = 400;
                throw error;
            }
        }

        const updatedSpecialty = await specialtyDAO.update(id, data);
        return updatedSpecialty;
    } catch (error) {
        throw error;
    }
};

export default updateSpecialtyService;