import { Router } from 'express';

import * as authControllers from '../Controllers/AuthControllers/index.js';
import { checkAuth } from '../../Infraestructura/middlewares/authMiddleware.js'
import logoutController from '../Controllers/AuthControllers/logoutController.js'

const router = Router();

import { uploadCredentials, handleMulterError } from '../../Infraestructura/config/multerConfig.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

router.post(
    '/signUp',
    uploadCredentials.fields([
        { name: 'medical_license_document', maxCount: 1 },
        { name: 'cedula_document', maxCount: 1 },
        { name: 'additional_documents', maxCount: 3 }
    ]),
    handleMulterError,
    auditAction('user_signup', 'User'),
    authControllers.signUp
);
router.post('/signUp/confirm-account', auditAction('user_confirm_account', 'User'), authControllers.confirmAccount);

router.post('/logIn', auditAction('user_login', 'User'), authControllers.logIn);
router.post('/admin/login', auditAction('admin_login', 'Admin'), authControllers.adminLogin);

router.post('/logout', checkAuth, auditAction('user_logout', 'User'), logoutController)

router.post('/reset-password', auditAction('user_reset_password', 'User'), authControllers.changePassStep1);
router.route('/reset-password/:token')
    .get(auditAction('user_reset_password', 'User'), authControllers.changePassStep2)
    .post(auditAction('user_reset_password', 'User'), authControllers.changepassStep3);

router.get('/profile', checkAuth, auditAction('user_profile', 'User'), authControllers.profile);
router.put('/profile', checkAuth, auditAction('user_update_profile', 'User'), authControllers.updateProfile);
router.post('/change-password', checkAuth, auditAction('user_change_password', 'User'), authControllers.changePassword);

router.get('/sessions', checkAuth, auditAction('user_sessions', 'User'), authControllers.getActiveSessions);
router.delete('/sessions/:sessionId', checkAuth, authControllers.logoutSessionById);

export default router;