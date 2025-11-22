// Dependences
import { Router } from 'express';

// Cusom modules
import * as authControllers from '../Controllers/AuthControllers/index.js';
import { checkAuth } from '../../Infraestructura/middlewares/authMiddleware.js'
import logoutController from '../Controllers/AuthControllers/logoutController.js'


// Router init
const router = Router();

// Public routes
router.post('/signUp', authControllers.singUp);
router.post('/signUp/confirm-account', authControllers.confirmAccount);

router.post('/logIn', authControllers.logIn);

router.post('/logout', checkAuth, logoutController)

router.post('/reset-password', authControllers.changePassStep1);
router.route('/reset-password/:token')
    .get(authControllers.changePassStep2)
    .post(authControllers.changepassStep3);

// protected routes
router.get('/profile', checkAuth, authControllers.profile);



export default router;