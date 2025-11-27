import getDocumentUrl from '../../../Negocio/DoctorServices/getDocumentUrl.js';

const getDocument = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const result = await getDocumentUrl(filename, userId, userRole);

        res.sendFile(result.filePath);
    } catch (error) {
        next(error);
    }
};

export default getDocument;
