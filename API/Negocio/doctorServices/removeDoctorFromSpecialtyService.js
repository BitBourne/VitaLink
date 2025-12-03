import DoctorSpecialtyDAO from '../../Datos/DAOs/DoctorSpecialtyDAO.js';

const removeDoctorFromSpecialtyService = async (doctorProfileId, specialtyId) => {
    const doctorSpecialtyDAO = new DoctorSpecialtyDAO();

    await doctorSpecialtyDAO.removeDoctorFromSpecialty(doctorProfileId, specialtyId);

    return {
        success: true,
        message: 'Especialidad removida exitosamente'
    };
};

export default removeDoctorFromSpecialtyService;
