// Dependences
import { Router } from 'express';

// Cusom modules
import * as authControllers from '../Controllers/AuthControllers/index.js';



// Router init
const router = Router();

// Public routes
router.post('/singUp', authControllers.singUp);
router.post('/singUp/confirm-account', authControllers.confirmAccount);

router.post('/logIn', authControllers.logIn);



export default router;