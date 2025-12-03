import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import emailAccountVerified from '../authServices/helpers/emailAccountVerified.js';
import logger from '../../Infraestructura/utils/logger.js';

/**
 * Servicio para que el administrador verifique las credenciales médicas del doctor
 * @param {number} doctorProfileId - ID del perfil del doctor
 * @param {object} verificationData - Objeto que contiene el estado de verificación y notas
 * @param {number} adminId - ID del usuario administrador que está verificando
 * @returns {object} Perfil de doctor actualizado
 */
const verifyDoctorCredentials = async (doctorProfileId, verificationData, adminId) => {
    // Asegurar que sean booleanos
    const license_verified = verificationData.license_verified === true || verificationData.license_verified === 'true';
    const cedula_verified = verificationData.cedula_verified === true || verificationData.cedula_verified === 'true';
    const { verification_notes } = verificationData;

    // Log para depuración
    logger.info(`Verifying doctor ${doctorProfileId}: license=${license_verified}, cedula=${cedula_verified}`);

    if (verificationData.license_verified === undefined && verificationData.cedula_verified === undefined) {
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

        // Solo marcar como verified si AMBAS credenciales están verificadas
        if (license_verified && cedula_verified) {
            updateData.verification_status = 'verified';
            updateData.verified_at = new Date();
            updateData.verified_by_admin_id = adminId;
        } else if (!license_verified || !cedula_verified) {
            // Si alguna es rechazada (false), el estado general puede ser rejected o documents_requested
            // Aquí asumimos rejected si no están ambas aprobadas, pero esto podría refinarse
            updateData.verification_status = 'rejected';
            updateData.verified_at = null;
            updateData.verified_by_admin_id = null;
        }

        logger.info(`Updating doctor ${doctorProfileId} with data:`, updateData);
        await doctorProfileDAO.update(doctorProfileId, updateData);

        const updatedProfile = await doctorProfileDAO.findById(doctorProfileId);

        // Si fue verificado exitosamente, enviar email de aprobación
        if (updatedProfile.verification_status === 'verified') {
            try {
                const userDAO = new UserDAO();
                const user = await userDAO.findById(updatedProfile.user_id);

                if (user) {
                    await emailAccountVerified({
                        name: user.name,
                        last_name: user.last_name,
                        email: user.email
                    });
                }
            } catch (emailError) {
                logger.error('Error enviando email de aprobación (no crítico):', emailError);
            }
        }

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
        // Exponer mensaje de error para depuración
        const serviceError = new Error(`Error al verificar las credenciales: ${error.message}`);
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default verifyDoctorCredentials;
