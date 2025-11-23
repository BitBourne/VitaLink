import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import adminRoutes from './adminRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import availabilityRoutes from './availabilityRoutes.js';
import auditRoutes from './auditRoutes.js';
import clinicRoutes from './clinicRoutes.js';
import roleRoutes from './roleRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/doctor', doctorRoutes);
router.use('/admin', adminRoutes);
router.use('/reviews', reviewRoutes);
router.use('/availability', availabilityRoutes);
router.use('/audit', auditRoutes);
router.use('/clinics', clinicRoutes);
router.use('/roles', roleRoutes);

export default router;