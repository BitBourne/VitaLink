// Dependences
import { Router } from 'express';

// Cusom modules
import * as authControllers from '../Controllers/AuthControllers/index.js';



// Router init
const router = Router();

// Public routes
router.post('/logIn', authControllers.logIn);
router.post('/singUp', authControllers.singUp);





export default router;