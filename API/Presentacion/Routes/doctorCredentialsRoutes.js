import express from 'express';
import { updateCredentials, verifyCredentials, getCredentialStatus } from '../Controllers/doctorCredentialsController.js';
import uploadDocuments from '../Controllers/DoctorControllers/uploadDocumentsController.js';
import requestDocumentsController from '../Controllers/DoctorControllers/requestDocumentsController.js';
import getDocument from '../Controllers/DoctorControllers/getDocumentController.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import checkDocumentAccess from '../../Infraestructura/middlewares/checkDocumentAccess.js';
import { uploadCredentials, handleMulterError } from '../../Infraestructura/config/multerConfig.js';

const router = express.Router();

router.put('/credentials', checkAuth, checkRole(['doctor']), updateCredentials);

router.post('/credentials/verify/:doctorProfileId', checkAuth, checkRole(['admin']), verifyCredentials);

router.get('/credentials/status', checkAuth, checkRole(['doctor']), getCredentialStatus);

router.put(
    '/credentials/upload',
    checkAuth,
    checkRole(['doctor']),
    uploadCredentials.fields([
        { name: 'medical_license', maxCount: 1 },
        { name: 'cedula', maxCount: 1 },
        { name: 'additional', maxCount: 3 }
    ]),
    handleMulterError,
    uploadDocuments
);

router.post('/credentials/request-documents/:doctorProfileId', checkAuth, checkRole(['admin']), requestDocumentsController);

router.get('/credentials/document/:filename', checkAuth, checkDocumentAccess, getDocument);

export default router;
