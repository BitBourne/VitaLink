import { Router } from 'express';
import * as appointmentControllers from '../Controllers/AppointmentControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import checkDoctorVerified from '../../Infraestructura/middlewares/checkDoctorVerified.js';

const router = Router();

router.post('/', checkAuth, checkRole(['patient', 'doctor']), checkDoctorVerified(['doctor']), appointmentControllers.createAppointment);

router.get('/', checkAuth, appointmentControllers.getAppointments);

router.put('/:id/confirm', checkAuth, checkRole(['doctor']), (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'confirmed';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

router.put('/:id/cancel', checkAuth, checkRole(['patient', 'doctor']), (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'cancelled';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

router.put('/:id/complete', checkAuth, checkRole(['doctor']), (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'completed';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

export default router;
