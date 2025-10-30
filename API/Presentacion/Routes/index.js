import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRoutes from './doctorRoutes.js'

const router = Router();

router.use('/auth', authRoutes);
router.use('/doctor', doctorRoutes);

export default router;