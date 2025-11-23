import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';

const updateClinicService = async (clinicId, updateData) => {
    const { name, address, city, state, phone, is_active } = updateData;

    try {
        const clinicDAO = new ClinicDAO();

        // Verificar que la clínica existe
        const clinic = await clinicDAO.findById(clinicId);
        if (!clinic) {
            const error = new Error('Clínica no encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Preparar datos de actualización
        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = name;
        if (address !== undefined) dataToUpdate.address = address;
        if (city !== undefined) dataToUpdate.city = city;
        if (state !== undefined) dataToUpdate.state = state;
        if (phone !== undefined) dataToUpdate.phone = phone;
        if (is_active !== undefined) dataToUpdate.is_active = is_active;

        await clinicDAO.update(clinicId, dataToUpdate);

        // Obtener la clínica actualizada
        const updatedClinic = await clinicDAO.findById(clinicId);

        return updatedClinic;
    } catch (error) {
        throw error;
    }
};

export default updateClinicService;
