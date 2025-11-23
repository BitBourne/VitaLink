import express from 'express';
import * as doctorControllers from '../Controllers/DoctorsControllers/index.js'
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

// Cualquier usuario autenticado puede ver la lista de doctores.
router.get('/', checkAuth, doctorControllers.getDoctores);

// Búsqueda de doctores por filtros (especialidad, ubicación, etc.).
router.get('/search', checkAuth, doctorControllers.searchDoctors);

// Asignar doctor a clínica (solo admin)
router.put('/:doctorProfileId/assign-clinic', checkAuth, checkRole(['admin']), doctorControllers.assignDoctorToClinic);

// Actualizar sueldo de doctor (solo admin)
router.put('/:doctorProfileId/salary', checkAuth, checkRole(['admin']), doctorControllers.updateDoctorSalary);

export default router;