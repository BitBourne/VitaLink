import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';

const getAllClinicsService = async (filters = {}) => {
    try {
        const clinicDAO = new ClinicDAO();
        const { city, is_active } = filters;

        const whereClause = {};

        if (city) {
            whereClause.city = city;
        }

        if (is_active !== undefined) {
            whereClause.is_active = is_active === 'true' || is_active === true;
        }

        const clinics = await clinicDAO.findAll({ where: whereClause });

        return clinics;
    } catch (error) {
        throw error;
    }
};

export default getAllClinicsService;
