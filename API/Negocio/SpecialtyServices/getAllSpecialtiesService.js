import SpecialtyDAO from '../../Datos/DAOs/SpecialtyDAO.js';

const getAllSpecialtiesService = async () => {
    try {
        const specialtyDAO = new SpecialtyDAO();
        const specialties = await specialtyDAO.findAll();
        return specialties;
    } catch (error) {
        throw error;
    }
};

export default getAllSpecialtiesService;