import SpecialtyDAO from '../../Datos/DAOs/SpecialtyDAO.js';

const createSpecialtyService = async (data) => {
    try {
        const specialtyDAO = new SpecialtyDAO();

        // Validar si ya existe una especialidad con el mismo nombre
        const existingSpecialty = await specialtyDAO.findOne({ name: data.name });
        if (existingSpecialty) {
            const error = new Error('La especialidad ya existe');
            error.statusCode = 400;
            throw error;
        }

        const newSpecialty = await specialtyDAO.create(data);
        return newSpecialty;
    } catch (error) {
        throw error;
    }
};

export default createSpecialtyService;