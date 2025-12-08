import { Router } from 'express';
import authRoutes from './authRoutes.js';
import doctorRoutes from './doctorRoutes.js';
import adminRoutes from './adminRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import availabilityRoutes from './availabilityRoutes.js';
import auditRoutes from './auditRoutes.js';
import clinicRoutes from './clinicRoutes.js';
import specialtyRoutes from './specialtyRoutes.js';
import roleRoutes from './roleRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import medicalRecordRoutes from './medicalRecordRoutes.js';
import chatRoutes from './chatRoutes.js';
import doctorCredentialsRoutes from './doctorCredentialsRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/doctor', doctorCredentialsRoutes);
router.use('/doctor', doctorRoutes);
router.use('/admin', adminRoutes);
router.use('/reviews', reviewRoutes);
router.use('/availability', availabilityRoutes);
router.use('/audit', auditRoutes);
router.use('/clinics', clinicRoutes);
router.use('/specialties', specialtyRoutes);
router.use('/roles', roleRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/medical-records', medicalRecordRoutes);
router.use('/chats', chatRoutes);

export default router;