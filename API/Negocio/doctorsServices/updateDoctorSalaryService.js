import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

const updateDoctorSalaryService = async (doctorProfileId, salary) => {
    try {
        const doctorProfileDAO = new DoctorProfileDAO();

        // Verificar que el doctor existe
        const doctor = await doctorProfileDAO.findById(doctorProfileId);
        if (!doctor) {
            const error = new Error('Doctor no encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Validar que el sueldo sea válido
        if (salary <= 0) {
            const error = new Error('El sueldo debe ser mayor a 0');
            error.statusCode = 400;
            throw error;
        }

        // Actualizar sueldo
        await doctorProfileDAO.update(doctorProfileId, { salary });

        // Obtener doctor actualizado
        const updatedDoctor = await doctorProfileDAO.findById(doctorProfileId);

        return updatedDoctor;
    } catch (error) {
        throw error;
    }
};

export default updateDoctorSalaryService;
