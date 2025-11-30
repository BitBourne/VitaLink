import uploadDoctorDocuments from '../../../Negocio/doctorServices/uploadDoctorDocuments.js';

const uploadDocuments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            const error = new Error('No se proporcionaron archivos para subir.');
            error.statusCode = 400;
            return next(error);
        }

        const result = await uploadDoctorDocuments(userId, files);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default uploadDocuments;
