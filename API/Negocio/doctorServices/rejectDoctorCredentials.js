import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import emailAccountRejected from '../authServices/helpers/emailAccountRejected.js';
import logger from '../../Infraestructura/utils/logger.js';

/**
 * Servicio para que el administrador rechace las credenciales médicas del doctor
 * @param {number} doctorProfileId - ID del perfil del doctor
 * @param {object} rejectionData - Objeto que contiene las notas de rechazo
 * @param {string} rejectionData.verification_notes - Razón del rechazo
 * @returns {object} Perfil de doctor actualizado
 */
const rejectDoctorCredentials = async (doctorProfileId, rejectionData) => {
    const { verification_notes } = rejectionData;

    if (!verification_notes || verification_notes.trim() === '') {
        const error = new Error('Debe proporcionar una razón para el rechazo.');
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
            license_verified: false,
            cedula_verified: false,
            verification_status: 'rejected',
            verification_notes: verification_notes,
            verified_at: null,
            verified_by_admin_id: null
        };

        await doctorProfileDAO.update(doctorProfileId, updateData);

        const updatedProfile = await doctorProfileDAO.findById(doctorProfileId);

        // Enviar email de rechazo
        try {
            const userDAO = new UserDAO();
            const user = await userDAO.findById(updatedProfile.user_id);

            if (user) {
                await emailAccountRejected({
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    verification_notes: verification_notes
                });
            }
        } catch (emailError) {
            logger.error('Error enviando email de rechazo (no crítico):', emailError);
        }

        return {
            success: true,
            message: 'Credenciales rechazadas. Se ha notificado al doctor.',
            profile: {
                id: updatedProfile.id,
                license_verified: updatedProfile.license_verified,
                cedula_verified: updatedProfile.cedula_verified,
                verification_status: updatedProfile.verification_status,
                verification_notes: updatedProfile.verification_notes
            }
        };

    } catch (error) {
        logger.error('Error in rejectDoctorCredentials:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al rechazar las credenciales.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default rejectDoctorCredentials;
