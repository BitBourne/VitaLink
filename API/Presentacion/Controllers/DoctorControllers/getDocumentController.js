import getDocumentUrl from '../../../Negocio/doctorServices/getDocumentUrl.js';

const getDocument = async (req, res, next) => {
    try {
        const { filename } = req.params;
        const userId = req.user.id;
        const userRoles = req.user.roles;

        const result = await getDocumentUrl(filename, userId, userRoles);

        // Set CORS headers to allow cross-origin access
        res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGINS?.split(',')[0] || 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');

        res.sendFile(result.filePath);
    } catch (error) {
        next(error);
    }
};

export default getDocument;
