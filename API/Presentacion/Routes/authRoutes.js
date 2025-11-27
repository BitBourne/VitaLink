import { Router } from 'express';

import * as authControllers from '../Controllers/AuthControllers/index.js';
import { checkAuth } from '../../Infraestructura/middlewares/authMiddleware.js'
import logoutController from '../Controllers/AuthControllers/logoutController.js'

const router = Router();

router.post('/signUp', authControllers.signUp);
router.post('/signUp/confirm-account', authControllers.confirmAccount);

router.post('/logIn', authControllers.logIn);

router.post('/logout', checkAuth, logoutController)

router.post('/reset-password', authControllers.changePassStep1);
router.route('/reset-password/:token')
    .get(authControllers.changePassStep2)
    .post(authControllers.changepassStep3);

router.get('/profile', checkAuth, authControllers.profile);

router.get('/sessions', checkAuth, authControllers.getActiveSessions);
router.delete('/sessions/:sessionId', checkAuth, authControllers.logoutSessionById);

export default router;