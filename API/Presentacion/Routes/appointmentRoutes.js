import { Router } from 'express';
import * as appointmentControllers from '../Controllers/AppointmentControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import checkDoctorVerified from '../../Infraestructura/middlewares/checkDoctorVerified.js';
import { validateCreateAppointment, validateAppointmentId } from '../Validators/appointmentValidators.js';
import handleValidationErrors from '../Validators/validationMiddleware.js';

const router = Router();

// Crear cita con validación
router.post('/', checkAuth, checkRole(['patient', 'doctor']), checkDoctorVerified(['doctor']), validateCreateAppointment, handleValidationErrors, appointmentControllers.createAppointment);

router.get('/', checkAuth, appointmentControllers.getAppointments);

// Pantalla de citas
router.get('/:id', checkAuth, appointmentControllers.getAppointmentDetails);



// Confirmar cita (solo doctores) con validación de ID
router.put('/:id/confirm', checkAuth, checkRole(['doctor']), validateAppointmentId, handleValidationErrors, (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'confirmed';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

// Cancelar cita con validación de ID
router.put('/:id/cancel', checkAuth, checkRole(['patient', 'doctor']), validateAppointmentId, handleValidationErrors, (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'cancelled';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

// Completar cita (solo doctores) con validación de ID
router.put('/:id/complete', checkAuth, checkRole(['doctor']), validateAppointmentId, handleValidationErrors, (req, res, next) => {
    if (!req.body) req.body = {};
    req.body.status = 'completed';
    appointmentControllers.updateAppointmentStatus(req, res, next);
});

export default router;
