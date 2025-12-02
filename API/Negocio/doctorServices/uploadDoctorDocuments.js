import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

/**
 * Servicio para subir documentos de credenciales del doctor
 * @param {number} userId - ID de usuario del doctor
 * @param {object} files - Objeto que contiene archivos subidos desde multer
 * @returns {object} Perfil de doctor actualizado con URLs de documentos
 */
const uploadDoctorDocuments = async (userId, files) => {
    try {
        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

        if (!doctorProfile) {
            const error = new Error('Perfil de doctor no encontrado.');
            error.statusCode = 404;
            throw error;
        }

        const updateData = {};
        const baseUrl = '/doctor/credentials/document/';

        if (files.medical_license && files.medical_license[0]) {
            updateData.medical_license_document_url = baseUrl + files.medical_license[0].filename;
        }

        if (files.cedula && files.cedula[0]) {
            updateData.cedula_document_url = baseUrl + files.cedula[0].filename;
        }

        if (files.additional && files.additional.length > 0) {
            const additionalUrls = files.additional.map(file => baseUrl + file.filename);
            updateData.additional_documents_urls = [
                ...(doctorProfile.additional_documents_urls || []),
                ...additionalUrls
            ];
        }

        if (Object.keys(updateData).length === 0) {
            const error = new Error('No se proporcionaron archivos para subir.');
            error.statusCode = 400;
            throw error;
        }

        updateData.verification_status = 'under_review';

        const updatedProfile = await doctorProfileDAO.update(doctorProfile.id, updateData);

        return {
            success: true,
            message: 'Documentos subidos exitosamente. En revisión por un administrador.',
            profile: {
                id: updatedProfile.id,
                medical_license_document_url: updatedProfile.medical_license_document_url,
                cedula_document_url: updatedProfile.cedula_document_url,
                additional_documents_urls: updatedProfile.additional_documents_urls,
                verification_status: updatedProfile.verification_status
            }
        };

    } catch (error) {
        console.error('Error in uploadDoctorDocuments:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al subir los documentos.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default uploadDoctorDocuments;
