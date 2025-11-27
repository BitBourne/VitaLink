import path from 'path';
import logger from '../utils/logger.js';

const checkDocumentAccess = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        if (userRole === 'admin' || userRole === 1) {
            return next();
        }

        if (userRole === 'doctor' || userRole === 2) {
            const DoctorProfileDAO = (await import('../../Datos/DAOs/DoctorProfileDAO.js')).default;
            const doctorProfileDAO = new DoctorProfileDAO();

            const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

            if (!doctorProfile) {
                const error = new Error('Perfil de doctor no encontrado');
                error.statusCode = 404;
                return next(error);
            }

            const doctorDocuments = [
                doctorProfile.medical_license_document_url,
                doctorProfile.cedula_document_url,
                ...(doctorProfile.additional_documents_urls || [])
            ].filter(Boolean);

            const hasAccess = doctorDocuments.some(docUrl => docUrl && docUrl.includes(filename));

            if (!hasAccess) {
                const error = new Error('No tiene permisos para acceder a este documento');
                error.statusCode = 403;
                return next(error);
            }

            return next();
        }

        const error = new Error('No tiene permisos para acceder a documentos');
        error.statusCode = 403;
        return next(error);

    } catch (error) {
        logger.error('Error in checkDocumentAccess:', error);
        const err = new Error('Error al verificar permisos de acceso');
        err.statusCode = 500;
        return next(err);
    }
};

export default checkDocumentAccess;
