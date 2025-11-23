// Dependences
import { Router } from 'express';

// Cusom modules
import * as authControllers from '../Controllers/AuthControllers/index.js';
import { checkAuth } from '../../Infraestructura/middlewares/authMiddleware.js'


// Router init
const router = Router();

// Public routes
router.post('/singUp', authControllers.signUp);
router.post('/singUp/confirm-account', authControllers.confirmAccount);

router.post('/logIn', authControllers.logIn);

// protected routes
router.get('/profile', checkAuth, authControllers.profile);



export default router;