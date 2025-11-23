import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';

const createClinicService = async (clinicData) => {
    const { name, address, city, state, phone } = clinicData;

    // Validaciones
    if (!name || !address || !city || !state) {
        const error = new Error('Los campos name, address, city y state son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    try {
        const clinicDAO = new ClinicDAO();

        // Verificar si ya existe una clínica con ese nombre en la misma ciudad
        const existingClinic = await clinicDAO.findOne({ name, city });

        if (existingClinic) {
            const error = new Error('Ya existe una clínica con ese nombre en esta ciudad');
            error.statusCode = 400;
            throw error;
        }

        const clinic = await clinicDAO.create({
            name,
            address,
            city,
            state,
            phone,
            is_active: true
        });

        return clinic;
    } catch (error) {
        throw error;
    }
};

export default createClinicService;
