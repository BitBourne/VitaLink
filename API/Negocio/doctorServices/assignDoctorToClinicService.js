import DoctorClinicDAO from '../../Datos/DAOs/DoctorClinicDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';

const assignDoctorToClinicService = async (doctorProfileId, clinicId) => {
    const doctorClinicDAO = new DoctorClinicDAO();
    const doctorProfileDAO = new DoctorProfileDAO();
    const clinicDAO = new ClinicDAO();

    const doctor = await doctorProfileDAO.findById(doctorProfileId);
    if (!doctor) {
        const error = new Error('Perfil de doctor no encontrado');
        error.statusCode = 404;
        throw error;
    }

    const clinic = await clinicDAO.findById(clinicId);
    if (!clinic) {
        const error = new Error('Clínica no encontrada');
        error.statusCode = 404;
        throw error;
    }

    await doctorClinicDAO.assignDoctorToClinic(doctorProfileId, clinicId);

    return {
        success: true,
        message: `Doctor asignado a ${clinic.name} exitosamente`
    };
};

export default assignDoctorToClinicService;
