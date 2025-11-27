import express from 'express';
import * as availabilityControllers from '../Controllers/AvailabilityControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import checkDoctorVerified from '../../Infraestructura/middlewares/checkDoctorVerified.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = express.Router();

router.post('/', checkAuth, checkRole(['doctor']), checkDoctorVerified(), auditAction('set_availability', 'DoctorAvailability'), availabilityControllers.setAvailability);

router.get('/:doctorId', checkAuth, availabilityControllers.getAvailability);

router.delete('/:id', checkAuth, checkRole(['doctor']), checkDoctorVerified(), auditAction('delete_availability', 'DoctorAvailability'), availabilityControllers.deleteAvailability);

export default router;
