import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

/**
 * Servicio para que el administrador solicite documentos a un doctor
 * @param {number} doctorProfileId - ID del perfil del doctor
 * @param {string} reason - Razón para solicitar documentos
 * @returns {object} Perfil de doctor actualizado
 */
const requestDocuments = async (doctorProfileId, reason) => {
    if (!reason || reason.trim().length === 0) {
        const error = new Error('Debe proporcionar una razón para solicitar documentos.');
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
            verification_status: 'documents_requested',
            verification_notes: reason
        };

        const updatedProfile = await doctorProfileDAO.update(doctorProfileId, updateData);

        return {
            success: true,
            message: 'Solicitud de documentos enviada al doctor.',
            profile: {
                id: updatedProfile.id,
                verification_status: updatedProfile.verification_status,
                verification_notes: updatedProfile.verification_notes
            }
        };

    } catch (error) {
        console.error('Error in requestDocuments:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al solicitar documentos.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default requestDocuments;
