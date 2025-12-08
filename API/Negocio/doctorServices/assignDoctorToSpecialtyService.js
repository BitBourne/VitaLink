import DoctorSpecialtyDAO from '../../Datos/DAOs/DoctorSpecialtyDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import SpecialtyDAO from '../../Datos/DAOs/SpecialtyDAO.js';

const assignDoctorToSpecialtyService = async (doctorProfileId, specialtyId) => {
    const doctorSpecialtyDAO = new DoctorSpecialtyDAO();
    const doctorProfileDAO = new DoctorProfileDAO();
    const specialtyDAO = new SpecialtyDAO();

    const doctor = await doctorProfileDAO.findById(doctorProfileId);
    if (!doctor) {
        const error = new Error('Perfil de doctor no encontrado');
        error.statusCode = 404;
        throw error;
    }

    const specialty = await specialtyDAO.findById(specialtyId);
    if (!specialty) {
        const error = new Error('Especialidad no encontrada');
        error.statusCode = 404;
        throw error;
    }

    await doctorSpecialtyDAO.assignDoctorToSpecialty(doctorProfileId, specialtyId);

    return {
        success: true,
        message: `Especialidad ${specialty.name} asignada exitosamente`
    };
};

export default assignDoctorToSpecialtyService;