import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import logger from '../../Infraestructura/utils/logger.js';

/**
 * Servicio para que el administrador verifique las credenciales médicas del doctor
 * @param {number} doctorProfileId - ID del perfil del doctor
 * @param {object} verificationData - Objeto que contiene el estado de verificación y notas
 * @param {number} adminId - ID del usuario administrador que está verificando
 * @returns {object} Perfil de doctor actualizado
 */
const verifyDoctorCredentials = async (doctorProfileId, verificationData, adminId) => {
    const { license_verified, cedula_verified, verification_notes } = verificationData;

    if (license_verified === undefined && cedula_verified === undefined) {
        const error = new Error('Debe proporcionar al menos un estado de verificación.');
        error.statusCode = 400;
        throw error;
    }

    try {
        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findById(doctorProfileId);

        if (!doctorProfile) {
            const error = new Error('Perfil de doctor no encontrado.');
            error.statusCode = 404;
            throw error;
        }

        const updateData = {
            license_verified: license_verified,
            cedula_verified: cedula_verified,
            verification_notes: verification_notes || null
        };

        if (license_verified && cedula_verified) {
            updateData.verification_status = 'verified';
            updateData.verified_at = new Date();
            updateData.verified_by_admin_id = adminId;
        } else if (!license_verified || !cedula_verified) {
            updateData.verification_status = 'rejected';
            updateData.verified_at = null;
            updateData.verified_by_admin_id = null;
        }

        await doctorProfileDAO.update(doctorProfileId, updateData);

        const updatedProfile = await doctorProfileDAO.findById(doctorProfileId);

        return {
            success: true,
            message: 'Estado de verificación actualizado exitosamente.',
            profile: {
                id: updatedProfile.id,
                license_verified: updatedProfile.license_verified,
                cedula_verified: updatedProfile.cedula_verified,
                verification_status: updatedProfile.verification_status,
                verified_at: updatedProfile.verified_at,
                verified_by_admin_id: updatedProfile.verified_by_admin_id,
                verification_notes: updatedProfile.verification_notes
            }
        };

    } catch (error) {
        logger.error('Error in verifyDoctorCredentials:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al verificar las credenciales.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default verifyDoctorCredentials;
