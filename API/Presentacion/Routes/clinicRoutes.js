import { Router } from 'express';
import { checkAuth, checkPermission } from '../../Infraestructura/middlewares/authMiddleware.js';
import {
    createClinicController,
    getAllClinicsController,
    getClinicByIdController,
    updateClinicController,
    deleteClinicController
} from '../Controllers/ClinicControllers/index.js';

const router = Router();

// Crear clínica (solo admin)
router.post('/', checkAuth, checkPermission(['todo', 'manage_clinics']), createClinicController);

// Obtener todas las clínicas (cualquier usuario autenticado)
router.get('/', checkAuth, getAllClinicsController);

// Obtener clínica por ID (cualquier usuario autenticado)
router.get('/:id', checkAuth, getClinicByIdController);

// Actualizar clínica (solo admin)
router.put('/:id', checkAuth, checkPermission(['todo', 'manage_clinics']), updateClinicController);

// Eliminar clínica (solo admin)
router.delete('/:id', checkAuth, checkPermission(['todo', 'manage_clinics']), deleteClinicController);

export default router;
