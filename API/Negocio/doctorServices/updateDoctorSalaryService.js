import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

const updateDoctorSalaryService = async (doctorProfileId, salary) => {
    try {
        const doctorProfileDAO = new DoctorProfileDAO();

        const doctor = await doctorProfileDAO.findById(doctorProfileId);
        if (!doctor) {
            const error = new Error('Doctor no encontrado');
            error.statusCode = 404;
            throw error;
        }

        await doctorProfileDAO.update(doctorProfileId, { salary });

        return await doctorProfileDAO.findById(doctorProfileId);
    } catch (error) {
        throw error;
    }
};

export default updateDoctorSalaryService;
