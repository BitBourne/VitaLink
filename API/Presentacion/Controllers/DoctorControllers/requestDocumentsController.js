import requestDocuments from '../../../Negocio/doctorServices/requestDocuments.js';

const requestDocumentsController = async (req, res, next) => {
    try {
        const { doctorProfileId } = req.params;
        const { reason } = req.body;

        if (!reason) {
            const error = new Error('Debe proporcionar una razón para solicitar documentos.');
            error.statusCode = 400;
            return next(error);
        }

        const result = await requestDocuments(parseInt(doctorProfileId), reason);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default requestDocumentsController;
