import uploadConfig from '../config/uploadConfig.js';

/**
 * Middleware para subir documentos de credenciales de doctor
 * Acepta:
 * - medical_license_document: 1 archivo (obligatorio para doctores)
 * - cedula_document: 1 archivo (obligatorio para doctores)
 * - additional_documents: hasta 3 archivos (opcional)
 */
const uploadDoctorDocuments = uploadConfig.fields([
    { name: 'medical_license_document', maxCount: 1 },
    { name: 'cedula_document', maxCount: 1 },
    { name: 'additional_documents', maxCount: 3 }
]);

/**
 * Wrapper para manejar errores de multer
 */
const handleUploadErrors = (req, res, next) => {
    uploadDoctorDocuments(req, res, (err) => {
        if (err) {
            // Error de multer
            if (err.code === 'LIMIT_FILE_SIZE') {
                const error = new Error('El archivo excede el tamaño máximo permitido de 5MB.');
                error.statusCode = 400;
                return next(error);
            }

            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                const error = new Error('Demasiados archivos. Máximo: 1 licencia, 1 cédula, 3 adicionales.');
                error.statusCode = 400;
                return next(error);
            }

            // Error personalizado (tipo de archivo)
            if (err.statusCode) {
                return next(err);
            }

            // Error genérico
            const error = new Error('Error al subir archivos.');
            error.statusCode = 500;
            return next(error);
        }

        next();
    });
};

export default handleUploadErrors;
