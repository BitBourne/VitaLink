import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import validateMedicalLicense from '../authServices/helpers/validateMedicalLicense.js';
import validateCedulaProfesional from '../authServices/helpers/validateCedulaProfesional.js';
import logger from '../../Infraestructura/utils/logger.js';

/**
 * Servicio para actualizar las credenciales médicas del doctor
 * @param {number} userId - ID de usuario del doctor
 * @param {object} credentials - Objeto que contiene medical_license_number y/o cedula_profesional
 * @returns {object} Perfil de doctor actualizado
 */
const updateDoctorCredentials = async (userId, credentials) => {
    const { medical_license_number, cedula_profesional } = credentials;

    if (!medical_license_number && !cedula_profesional) {
        const error = new Error('Debe proporcionar al menos un campo para actualizar.');
        error.statusCode = 400;
        throw error;
    }

    if (medical_license_number && !validateMedicalLicense(medical_license_number)) {
        const error = new Error('El número de licencia médica no es válido. Debe tener entre 6-12 caracteres alfanuméricos.');
        error.statusCode = 400;
        throw error;
    }

    if (cedula_profesional && !validateCedulaProfesional(cedula_profesional)) {
        const error = new Error('La cédula profesional no es válida. Debe tener 7-8 dígitos.');
        error.statusCode = 400;
        throw error;
    }

    try {
        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

        if (!doctorProfile) {
            const error = new Error('Perfil de doctor no encontrado.');
            error.statusCode = 404;
            throw error;
        }

        const updateData = {};
        if (medical_license_number) {
            updateData.medical_license_number = medical_license_number;
            updateData.license_verified = false;
        }
        if (cedula_profesional) {
            updateData.cedula_profesional = cedula_profesional;
            updateData.cedula_verified = false;
        }

        const updatedProfile = await doctorProfileDAO.update(doctorProfile.id, updateData);

        return {
            success: true,
            message: 'Credenciales actualizadas exitosamente. Pendiente de verificación por un administrador.',
            profile: updatedProfile
        };

    } catch (error) {
        logger.error('Error in updateDoctorCredentials:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al actualizar las credenciales.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default updateDoctorCredentials;
