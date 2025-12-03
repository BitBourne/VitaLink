import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

const getDoctorCredentialStatus = async (userId) => {
    const doctorProfileDAO = new DoctorProfileDAO();
    const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

    if (!doctorProfile) {
        const error = new Error('Perfil de doctor no encontrado');
        error.statusCode = 404;
        throw error;
    }

    return {
        verification_status: doctorProfile.verification_status,
        license_verified: doctorProfile.license_verified,
        cedula_verified: doctorProfile.cedula_verified,
        verification_notes: doctorProfile.verification_notes
    };
};

export default getDoctorCredentialStatus;
