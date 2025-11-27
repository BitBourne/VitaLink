import DoctorClinicDAO from '../../Datos/DAOs/DoctorClinicDAO.js';

const removeDoctorFromClinicService = async (doctorProfileId, clinicId) => {
    const doctorClinicDAO = new DoctorClinicDAO();

    await doctorClinicDAO.removeDoctorFromClinic(doctorProfileId, clinicId);

    return {
        success: true,
        message: 'Doctor removido de la clínica exitosamente'
    };
};

export default removeDoctorFromClinicService;
