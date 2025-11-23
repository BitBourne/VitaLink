// availabilityRoutes.js
import express from 'express';
import * as availabilityControllers from '../Controllers/AvailabilityControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = express.Router();

// Crear/configurar disponibilidad (solo doctores)
router.post('/', checkAuth, checkRole(['doctor']), auditAction('set_availability', 'DoctorAvailability'), availabilityControllers.setAvailability);

// Ver disponibilidad de un doctor (público - cualquier usuario autenticado)
router.get('/:doctorId', checkAuth, availabilityControllers.getAvailability);

// Eliminar disponibilidad (solo el doctor propietario)
router.delete('/:id', checkAuth, checkRole(['doctor']), auditAction('delete_availability', 'DoctorAvailability'), availabilityControllers.deleteAvailability);

export default router;
